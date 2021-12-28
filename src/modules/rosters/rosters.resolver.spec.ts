import { Test, TestingModule } from "@nestjs/testing";
import { RostersResolver } from "./rosters.resolver";
import { RostersService } from "./rosters.service";

describe("RostersResolver", () => {
  let resolver: RostersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RostersResolver, RostersService],
    }).compile();

    resolver = module.get<RostersResolver>(RostersResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
