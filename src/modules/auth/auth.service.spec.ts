import { Test, TestingModule } from "@nestjs/testing";

import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

describe("TestsService", () => {
  let service: AuthService;

  const mockUsersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
