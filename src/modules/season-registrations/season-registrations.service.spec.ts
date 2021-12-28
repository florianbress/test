import { Test, TestingModule } from "@nestjs/testing";
import { SeasonRegistrationsService } from "./season-registrations.service";

describe("SeasonRegistrationsService", () => {
  let service: SeasonRegistrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonRegistrationsService],
    }).compile();

    service = module.get<SeasonRegistrationsService>(
      SeasonRegistrationsService
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
