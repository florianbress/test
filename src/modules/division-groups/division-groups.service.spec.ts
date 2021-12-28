import { Test, TestingModule } from "@nestjs/testing";
import { DivisionGroupsService } from "./division-groups.service";

describe("DivisionGroupsService", () => {
  let service: DivisionGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DivisionGroupsService],
    }).compile();

    service = module.get<DivisionGroupsService>(DivisionGroupsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
