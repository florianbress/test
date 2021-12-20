import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { OgmaLogger, OgmaService } from "@ogma/nestjs-module";
import { ForbiddenError } from "apollo-server-core";
import { v5 as uuidv5 } from "uuid";
import { ConfigService } from "../config/config.service";
import { PrismaService } from "../prisma/prisma.service";
import { hashPassword } from "../utils/functions";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    @OgmaLogger(UsersService) private logger: OgmaService
  ) {}

  /**
   * Attempting to create a new user. Throws `HttpException` on failure, on success returns a user object
   * @param createUserInput input the `CreateUserInput` `Argument`, provided as an object (`InputType decorator`), to enable validation
   * @returns a user object or `HttpException`
   */
  async create(createUserInput: CreateUserInput, req: any): Promise<User> {
    const lowerCaseUsername = createUserInput.username.toLowerCase();
    const lowerCaseEmail = createUserInput.email.toLowerCase();
    const uuidNameSpace = this.configService.get("app.uuidNameSpace", {
      infer: true,
    });

    this.logger.info("start");

    const existedUser = await this.prisma.user.findFirst({
      where: {
        username: lowerCaseUsername,
        email: {
          equals: lowerCaseEmail,
          mode: "insensitive",
        },
      },
    });

    if (existedUser) throw new ForbiddenError("User already exists.");

    const hashedPassword = await hashPassword(createUserInput.password);

    const createdUser = await this.prisma.user.create({
      data: {
        uuid: uuidv5(createUserInput.username, uuidNameSpace),
        username: createUserInput.username,
        email: lowerCaseEmail,
        password: hashedPassword,
        image: "https://nitroleague.de/img/LogoNLSquare.png",
      },
    });

    this.logger.info("test1");

    // const emailToken = await this.authService.generateToken(
    //   {
    //     uuid: createdUser.uuid,
    //     username: createdUser.username,
    //     email: createdUser.email,
    //     image: createdUser.image,
    //   } as Payload,
    //   "emailToken"
    // );

    this.logger.info("test2");

    // this.logger.info(emailToken);

    // await this.emailsService.create({
    //   userId: createdUser.uuid,
    //   type: EmailType.VERIFY_EMAIL,
    // });

    // await this.mailService.sendMail(
    //   "verifyEmail",
    //   createdUser,
    //   req,
    //   emailToken
    // );

    return createdUser;
  }
}
