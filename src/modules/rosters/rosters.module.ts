import { Module } from "@nestjs/common";
import { RostersService } from "./rosters.service";
import { RostersResolver } from "./rosters.resolver";

@Module({
  providers: [RostersResolver, RostersService],
})
export class RostersModule {}
