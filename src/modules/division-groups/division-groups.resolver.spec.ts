import { Test, TestingModule } from "@nestjs/testing";
import { DivisionGroupsResolver } from "./division-groups.resolver";
import { DivisionGroupsService } from "./division-groups.service";

describe("DivisionGroupsResolver", () => {
  let resolver: DivisionGroupsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DivisionGroupsResolver, DivisionGroupsService],
    }).compile();

    resolver = module.get<DivisionGroupsResolver>(DivisionGroupsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
