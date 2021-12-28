import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { OgmaLogger, OgmaService } from "@ogma/nestjs-module";
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from "apollo-server-core";
import { v5 as uuidv5 } from "uuid";
import { ConfigService } from "../../shared/config/config.service";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { comparePassword, hashPassword } from "../../utils/functions";
import { AuthService } from "../auth/auth.service";
import { EmailType } from "../emails/enums/email-type.enum";
import { EmailsService } from "./../emails/emails.service";
import { User } from "./entities/user.entity";
import { ChangePasswordInput } from "./inputs/change-password.input";
import { ForgotPasswordInput } from "./inputs/forgot-password.input";
import { LoginInput } from "./inputs/login.input";
import { ResetPasswordInput } from "./inputs/reset-password.input";
import { UserCreateInput } from "./inputs/user-create-input";
import { UserUpdateInput } from "./inputs/user-update.input";

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private prisma: PrismaService,
    private configService: ConfigService,
    private emailsService: EmailsService,
    @OgmaLogger(UsersService) private logger: OgmaService
  ) {}

  /**
   * Attempting to create a new user. Throws `HttpException` on failure, on success returns a user object
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param createUserInput input the `CreateUserInput` `Argument`, provided as an object (`InputType decorator`), to enable validation
   *
   * @returns a user object or `HttpException`
   *
   * @beta
   */
  async createUser(userCreateInput: UserCreateInput): Promise<User> {
    const lowerCaseEmail = userCreateInput.email.toLowerCase();
    const hashedPassword = await hashPassword(userCreateInput.password);
    const uuidNameSpace = this.configService.get("app.uuidNameSpace", {
      infer: true,
    });

    this.logger.info("start");

    let existedUser: User;

    existedUser = await this.prisma.user.findFirst({
      where: {
        username: userCreateInput.username,
        local: {
          email: {
            equals: lowerCaseEmail,
            mode: "insensitive",
          },
        },
      },
    });

    if (existedUser) throw new ForbiddenError("User already exists.");

    existedUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ epicGames: { email: lowerCaseEmail } }], // or statement incase we support multiple oauth ways at a later stage
      },
    });

    if (existedUser) {
      // TODO Let's merge them?
      const updateUser = await this.prisma.user.update({
        where: {
          uuid: existedUser.uuid,
        },
        data: {
          local: {
            update: {
              email: lowerCaseEmail,
              password: hashedPassword,
            },
          },
        },
      });

      return updateUser;
    }

    const createdUser = await this.prisma.user.create({
      data: {
        uuid: uuidv5(userCreateInput.username, uuidNameSpace),
        username: userCreateInput.username,
        local: {
          connectOrCreate: {
            where: {
              email: lowerCaseEmail,
            },
            create: {
              email: lowerCaseEmail,
              password: hashedPassword,
            },
          },
        },
        image: "https://nitroleague.de/img/LogoNLSquare.png",
      },
    });

    const emailToken = await this.authService.generateToken(
      createdUser,
      "emailToken"
    );

    // this.logger.info(emailToken);

    await this.emailsService.create({
      userId: createdUser.uuid,
      type: EmailType.VERIFY_EMAIL,
    });

    console.log(emailToken);

    // await this.mailService.sendMail(
    //   "verifyEmail",
    //   createdUser,
    //   req,
    //   emailToken
    // );

    return createdUser;
  }

  /**
   * Get a specific user by username
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param username used to identify the user
   *
   * @returns a user object or `HttpException`
   *
   * @beta
   *
   */
  async getUser(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      include: {
        local: true,
        epicGames: true,
      },
      where: {
        username,
      },
    });

    if (!user)
      throw new BadRequestException(`No user with username: ${username} found`);

    this.logger.info(user);

    return user;
  }

  /**
   * Get a specific user by Email
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param email used to identify the user
   *
   * @returns a user object or `HttpException`
   *
   * @beta
   */
  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      include: {
        local: true,
      },
      where: {
        local: {
          email: email.toLowerCase(),
        },
      },
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  /**
   * Get all users
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @returns an array of users or null
   *
   * @beta
   */
  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        isVerified: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        local: true,
        epicGames: true,
      },
    });

    this.logger.info(users);

    if (!users || users.length === 0)
      throw new HttpException("No users found", HttpStatus.NOT_FOUND);

    return users;
  }

  /**
   * Update a specific user
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param uuid used to identify the user which should be updated
   * @param UpdateUserInput input the `UpdateUserInput` `Argument`, provided as an object (`InputType decorator`), to enable validation
   *
   * @returns a boolean, `ForbiddenError` or `ApolloError`
   *
   * @beta
   */
  async updateUser(
    uuid: string,
    { ...userData }: UserUpdateInput
  ): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          uuid,
        },
      });

      if (!user) {
        throw new ForbiddenError("User not found.");
      }

      const updateUser = await this.prisma.user.update({
        where: {
          uuid: user.uuid,
        },
        data: {
          ...userData,
        },
      });

      return updateUser ? true : false;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  /**
   * Update the avatar of a specific user
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param uuid used to identify the user which should be updated
   * @param file which contains the image
   *
   * @returns a boolean, `ForbiddenError` or `ApolloError`
   *
   * @beta
   */
  async updateAvatar(uuid: string, file: any): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          uuid,
        },
      });

      if (!user) {
        throw new ForbiddenError("User not found.");
      }
      return user ? true : false;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  /**
   * delete a specific user
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param uuid used to identify a specific user
   *
   * @returns a boolean, `ForbiddenError` or `ApolloError`
   *
   * @beta
   */
  async deleteUser(uuid: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          uuid,
        },
      });

      if (!user) {
        throw new ForbiddenError("User not found.");
      }

      const updateUser = await this.prisma.user.update({
        where: {
          uuid,
        },
        data: {
          isActive: false,
        },
      });

      return updateUser ? true : false;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  /**
   * Used to check if a username is available
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param username used to identify the user
   *
   * @returns a boolean or throws a `ForbiddenError`
   *
   * @beta
   */
  async checkUsernameAvailibility(username: string): Promise<boolean> {
    const checkAvailibility = await this.prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (checkAvailibility) {
      throw new ForbiddenError("Username is already in use");
    }

    return true;
  }

  /**
   * Used to check if a email is available
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param email used to identify the email
   *
   * @returns a boolean or throws a `ForbiddenError`
   *
   * @beta
   */
  async checkEmailAvailibility(email: string): Promise<boolean> {
    const checkAvailibility = await this.prisma.user.findFirst({
      where: {
        local: {
          email: {
            equals: email,
            mode: "insensitive",
          },
        },
      },
    });

    if (checkAvailibility) {
      throw new ForbiddenError("Email is already in use");
    }

    return true;
  }

  /**
   * Used to verify the email of a user
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param emailToken identifies the token which was send over to the email of the user
   *
   * @returns a boolean or throws a `ForbiddenError`
   *
   * @beta
   */
  async verifyEmail(emailToken: string): Promise<boolean> {
    const user = await this.authService.verifyToken(emailToken, "emailToken");

    if (!user.isVerified) {
      const updateUser = await this.prisma.user.update({
        where: {
          uuid: user.uuid,
        },
        data: {
          isVerified: true,
        },
      });

      return updateUser ? true : false;
    } else {
      throw new ForbiddenError("Your email has been verified.");
    }
  }

  /**
   * Used to login the user
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param loginInput input the `LoginInput` `Argument`, provided as an object (`InputType decorator`), to enable validation
   *
   * @returns a boolean or throws a `ForbiddenError`
   *
   * @beta
   */
  async login(loginInput: LoginInput) {
    const lowerCaseEmail = loginInput.email.toLowerCase();

    const user = await this.prisma.user.findFirst({
      include: {
        local: true,
      },
      where: {
        local: {
          email: lowerCaseEmail,
        },
      },
    });

    if (
      user &&
      (await comparePassword(loginInput.password, user.local.password))
    ) {
      return await this.authService.tradeToken(user);
    }

    throw new AuthenticationError("Login failed.");
  }

  /**
   * Used to refresh the token
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param refreshToken provided as a string and used to verifiy if it is a valid token
   *
   * @returns a boolean or throws a `ForbiddenError`
   *
   * @beta
   */
  async refreshToken(refreshToken: string) {
    const user = await this.authService.verifyToken(
      refreshToken,
      "refreshToken"
    );

    const accessToken = await this.authService.generateToken(
      user,
      "accessToken"
    );

    return { accessToken };
  }

  /**
   * Used to change the password of a user
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param refreshToken provided as a string and used to verifiy if it is a valid token
   *
   * @returns a boolean or throws a `ForbiddenError`
   *
   * @beta
   */
  async changePassword(changePasswordInput: ChangePasswordInput) {
    const user = await this.prisma.user.findUnique({
      include: {
        local: true,
      },
      where: {
        username: changePasswordInput.username,
      },
    });

    if (!user) {
      throw new ForbiddenError("User not found.");
    }

    if (
      !(await comparePassword(
        changePasswordInput.oldPassword,
        user.local.password
      ))
    ) {
      throw new ForbiddenError(
        "Your current password is missing or incorrect."
      );
    }

    if (
      await comparePassword(
        changePasswordInput.newPassword,
        user.local.password
      )
    ) {
      throw new ForbiddenError(
        "Your new password must be different from your previous password."
      );
    }

    const updateUser = await this.prisma.local.update({
      where: {
        userId: user.uuid,
      },
      data: {
        password: await hashPassword(changePasswordInput.newPassword),
      },
    });

    return updateUser ? true : false;
  }

  /**
   * Used to validate and send a email to set a new  password if it has been forgotten
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param forgotPasswordInput input the `ForgotPasswordInput` `Argument`, provided as an object (`InputType decorator`), to enable validation
   *
   * @returns a boolean or throws a `ForbiddenError`
   *
   * @beta
   */
  async forgotPassword(
    forgotPasswordInput: ForgotPasswordInput
  ): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: forgotPasswordInput.username,
        isVerified: true,
      },
    });

    if (!user) {
      throw new ForbiddenError("User not found.");
    }

    const resetPassToken = await this.authService.generateToken(
      user,
      "resetPassToken"
    );

    //TODO implement email service

    // const existedEmail = await this.emailResolver.createEmail({
    //   userId: user._id,
    //   type: Type.FORGOT_PASSWORD,
    // });

    // // console.log(existedEmail)

    // await sendMail(
    //   "forgotPassword",
    //   user,
    //   req,
    //   resetPassToken,
    //   existedEmail._id
    // );

    const date = new Date();

    const updateUser = await this.prisma.user.update({
      where: {
        uuid: user.uuid,
      },
      data: {
        resetPasswordToken: resetPassToken,
        resetPasswordExpires: date.setHours(date.getHours() + 1), // 1 hour
      },
    });

    return updateUser ? true : false;
  }

  /**
   * Used to validate the resetPasswordToken and change to a desired new password
   *
   * @remarks
   * This method is part of the {@link modules/users}.
   *
   * @param resetPasswordInput input the `ResetPasswordInput` `Argument`, provided as an object (`InputType decorator`), to enable validation
   *
   * @returns a boolean or throws a `ForbiddenError`
   *
   * @beta
   */
  async resetPassword(
    resetPasswordInput: ResetPasswordInput
  ): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: resetPasswordInput.resetPasswordToken,
      },
    });

    if (!user) {
      throw new ForbiddenError("User not found.");
    }

    if (user.resetPasswordExpires < Date.now()) {
      throw new AuthenticationError(
        "Reset password token is invalid, please try again."
      );
    }

    const updateUser = await this.prisma.user.update({
      include: {
        local: true,
      },
      where: {
        uuid: user.uuid,
      },
      data: {
        local: {
          update: {
            password: await hashPassword(resetPasswordInput.password),
          },
        },
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return updateUser ? true : false;
  }
}
