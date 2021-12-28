import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { OgmaInterceptor, OgmaModule } from "@ogma/nestjs-module";
import { AuthModule } from "./modules/auth/auth.module";
import { DivisionGroupsModule } from "./modules/division-groups/division-groups.module";
import { DivisionsModule } from "./modules/divisions/divisions.module";
import { EmailsModule } from "./modules/emails/emails.module";
import { MatchesModule } from "./modules/matches/matches.module";
import { OrganizationsModule } from "./modules/organizations/organizations.module";
import { PostsModule } from "./modules/posts/posts.module";
import { RostersModule } from "./modules/rosters/rosters.module";
import { SeasonRegistrationsModule } from "./modules/season-registrations/season-registrations.module";
import { SeasonsModule } from "./modules/seasons/seasons.module";
import { TeamsModule } from "./modules/teams/teams.module";
import { UsersModule } from "./modules/users/users.module";
import applicationConfig from "./shared/config/config/application.config";
import { envFileSchema } from "./shared/config/env-file.schema";
import { GraphQLOptions, ogmaModuleOptions } from "./utils/constants";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [applicationConfig],
      validationSchema: envFileSchema,
    }),
    OgmaModule.forRoot(ogmaModuleOptions),
    GraphQLModule.forRoot({
      ...GraphQLOptions,
      context: ({ req, res }) => ({ req, res }),
    }),
    UsersModule,
    AuthModule,
    EmailsModule,
    TeamsModule,
    SeasonsModule,
    SeasonRegistrationsModule,
    RostersModule,
    PostsModule,
    MatchesModule,
    DivisionsModule,
    DivisionGroupsModule,
    OrganizationsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
  ],
})
export class AppModule {}
