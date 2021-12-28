import { EmailsService } from "./../emails/emails.service";
import { MailService } from "./../../shared/mail/mail.service";
import { ConfigService } from "../../config/config.service";
import { AuthService } from "./../auth/auth.service";
import { PrismaService } from "./../../shared/prisma/prisma.service";
import { BadRequestException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { createProviderToken } from "@ogma/nestjs-module";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        ConfigService,
        MailService,
        PrismaService,
        EmailsService,
        {
          provide: createProviderToken(UsersService.name),
          useValue: {
            log: jest.fn(),
          },
        },
        {
          provide: createProviderToken(AuthService.name),
          useValue: {
            log: jest.fn(),
          },
        },
        {
          provide: createProviderToken(MailService.name),
          useValue: {
            log: jest.fn(),
          },
        },
        {
          provide: createProviderToken(EmailsService.name),
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createUser", () => {
    it("should create a User", () => {
      expect(
        service.createUser({
          username: "jlorezz",
          email: "florianbress@gmail.com",
          password: "nitroleague",
        })
      ).toEqual({
        uuid: expect.any(String),
        email: "florianbress@gmail.com",
        password: "nitroleague",
        username: "jlorezz",
      });
    });
  });

  describe("getUsers", () => {
    it("should return an array of users", () => {
      expect(service.getUsers()).toEqual([
        {
          uuid: "testid",
          username: "jlorezz",
          firstName: "",
          lastName: "",
        },
      ]);
    });
  });

  describe("getUser", () => {
    it("should successfully return a user", () => {
      expect(service.getUser("jlorezz")).toEqual({
        uuid: expect.any(String),
        username: "jlorezz",
        local: {
          email: "florianbress@gmail.com",
        },
      });
    });
    it("should throw an error", () => {
      const noIdCall = () => service.getUser("1r1rqqf");
      expect(noIdCall).toThrowError(BadRequestException);
      expect(noIdCall).toThrowError("No user with username: 1r1rqqf found");
    });
  });
});
