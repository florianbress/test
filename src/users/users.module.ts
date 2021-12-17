import { Module } from "@nestjs/common";
import { OgmaModule } from "@ogma/nestjs-module";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";


@Module({
  imports: [
    OgmaModule.forFeature(UsersService.name),
    PrismaModule,
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
