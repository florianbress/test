import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { OgmaLogger, OgmaService } from "@ogma/nestjs-module";
import { AuthenticationError, ForbiddenError } from "apollo-server-core";
import { sign, verify } from "jsonwebtoken";
import { ConfigService } from "../../shared/config/config.service";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { comparePassword } from "../../utils/functions";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";

type TokenType =
  | "accessToken"
  | "refreshToken"
  | "emailToken"
  | "resetPassToken";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private prisma: PrismaService,
    private configService: ConfigService,
    @OgmaLogger(AuthService) private readonly logger: OgmaService
  ) {}

  common = {
    accessToken: {
      privateKey: this.configService.get("app.accessToken", { infer: true }),
      signOptions: {
        expiresIn: "30d", // 15m
      },
    },
    refreshToken: {
      privateKey: this.configService.get("app.refreshToken", {
        infer: true,
      }),
      signOptions: {
        expiresIn: "7d", // 7d
      },
    },
    emailToken: {
      privateKey: this.configService.get("app.emailToken", { infer: true }),
      signOptions: {
        expiresIn: "1d", // 1d
      },
    },
    resetPassToken: {
      privateKey: this.configService.get("app.resetPassToken", { infer: true }),
      signOptions: {
        expiresIn: "1d", // 1d
      },
    },
  };

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      include: {
        local: true,
      },
      where: {
        local: {
          email,
        },
      },
    });

    if (!user) {
      return null;
    }

    const passwordIsValid = await comparePassword(
      password,
      user.local.password
    );

    return passwordIsValid ? user : null;
  }

  /**
   * Returns token.
   *
   * @remarks
   * This method is part of the {@link auth/jwt}.
   *
   * @param payload - 1st input
   * @param type - 2nd input
   *
   * @returns The access token mean of `user`
   *
   * @beta
   */
  async generateToken(user: User, type: TokenType) {
    return sign({ uuid: user.uuid }, this.common[type].privateKey, {
      expiresIn: this.common[type].signOptions.expiresIn,
    });
  }

  /**
   * Returns user by verify token.
   *
   * @remarks
   * This method is part of the {@link auth/jwt}.
   *
   * @param token - 1st input
   * @param type - 2nd input
   *
   * @returns The user mean of `token`
   *
   * @beta
   */
  async verifyToken(token: string, type: TokenType): Promise<User> {
    let currentUser: User;

    await verify(token, this.common[type].privateKey, async (err, data) => {
      if (err) {
        throw new AuthenticationError(
          "Authentication token is invalid, please try again."
        );
      }

      currentUser = await this.prisma.user.findUnique({
        where: {
          uuid: data.uuid,
        },
      });
    });

    if (type === "emailToken") {
      return currentUser;
    }

    if (currentUser && !currentUser.isVerified) {
      throw new ForbiddenError("Please verify your email.");
    }

    return currentUser;
  }

  async tradeToken(user: User) {
    if (!user.isVerified) {
      throw new ForbiddenError("Please verify your email.");
    }

    if (!user.isActive) {
      throw new ForbiddenError("User already doesn't exist.");
    }

    if (user.isLocked) {
      throw new ForbiddenError("Your email has been locked.");
    }

    const accessToken = await this.generateToken(user, "accessToken");
    const refreshToken = await this.generateToken(user, "refreshToken");

    return { accessToken, refreshToken };
  }
}
