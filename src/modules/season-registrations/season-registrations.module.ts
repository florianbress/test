import { Module } from "@nestjs/common";
import { SeasonRegistrationsService } from "./season-registrations.service";
import { SeasonRegistrationsResolver } from "./season-registrations.resolver";

@Module({
  providers: [SeasonRegistrationsResolver, SeasonRegistrationsService],
})
export class SeasonRegistrationsModule {}
