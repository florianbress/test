import { Test, TestingModule } from "@nestjs/testing";
import { SeasonsResolver } from "./seasons.resolver";
import { SeasonsService } from "./seasons.service";

describe("SeasonsResolver", () => {
  let resolver: SeasonsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonsResolver, SeasonsService],
    }).compile();

    resolver = module.get<SeasonsResolver>(SeasonsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
