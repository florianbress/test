import { Test, TestingModule } from "@nestjs/testing";
import { SeasonRegistrationsResolver } from "./season-registrations.resolver";
import { SeasonRegistrationsService } from "./season-registrations.service";

describe("SeasonRegistrationsResolver", () => {
  let resolver: SeasonRegistrationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonRegistrationsResolver, SeasonRegistrationsService],
    }).compile();

    resolver = module.get<SeasonRegistrationsResolver>(
      SeasonRegistrationsResolver
    );
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
