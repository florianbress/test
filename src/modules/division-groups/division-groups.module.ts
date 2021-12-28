import { Module } from "@nestjs/common";
import { DivisionGroupsService } from "./division-groups.service";
import { DivisionGroupsResolver } from "./division-groups.resolver";

@Module({
  providers: [DivisionGroupsResolver, DivisionGroupsService],
})
export class DivisionGroupsModule {}
