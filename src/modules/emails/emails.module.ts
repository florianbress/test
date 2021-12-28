import { Module } from "@nestjs/common";
import { OgmaModule } from "@ogma/nestjs-module";

import { PrismaModule } from "../../shared/prisma/prisma.module";
import { EmailsResolver } from "./emails.resolver";
import { EmailsService } from "./emails.service";

@Module({
  imports: [OgmaModule.forFeature(EmailsService.name), PrismaModule],
  providers: [EmailsResolver, EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
