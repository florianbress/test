import { forwardRef, Module } from "@nestjs/common";
import { OgmaModule } from "@ogma/nestjs-module";
import { PrismaModule } from "../../shared/prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { DateScalar } from "../common/scalars/date.scalar";
import { EmailsModule } from "../emails/emails.module";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [
    OgmaModule.forFeature(UsersService.name),
    forwardRef(() => AuthModule),
    PrismaModule,
    EmailsModule,
  ],
  providers: [UsersResolver, UsersService, DateScalar],
  exports: [UsersService],
})
export class UsersModule {}
