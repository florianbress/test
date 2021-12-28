import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserInput } from "./../../../../web/generated/graphql";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

describe("TestsResolver", () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useFactory: () => ({
            createUser: jest.fn((user: CreateUserInput) => ({
              uuid: "testid",
              ...user,
            })),
            getUsers: jest.fn(() => [
              {
                uuid: "testid",
                username: "jlorezz",
                firstName: "",
                lastName: "",
              },
              {
                uuid: "testid",
                username: "jlorezz",
                firstName: "",
                lastName: "",
              },
            ]),
            getUser: jest.fn(() => ({
              uuid: "testid",
              username: "jlorezz",
              local: {
                email: "florianbress@gmail.com",
              },
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });

  describe("createUser", () => {
    it("should create a new User", () => {
      expect(
        resolver.createUser({
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
    it("should get the users array", () => {
      expect(resolver.users()).toEqual([
        {
          uuid: "testid",
          username: "jlorezz",
          firstName: "",
          lastName: "",
        },
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
    it("should get one user", () => {
      expect(resolver.user("jlorezz")).toEqual({
        uuid: expect.any(String),
        username: "jlorezz",
        local: {
          email: "florianbress@gmail.com",
        },
      });
    });
  });
});
