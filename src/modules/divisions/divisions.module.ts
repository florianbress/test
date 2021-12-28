import { Module } from "@nestjs/common";
import { DivisionsService } from "./divisions.service";
import { DivisionsResolver } from "./divisions.resolver";

@Module({
  providers: [DivisionsResolver, DivisionsService],
})
export class DivisionsModule {}
