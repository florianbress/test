import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { OgmaInterceptor, OgmaModule } from "@ogma/nestjs-module";
import applicationConfig from "./config/config/application.config";
import RedisConfig from "./config/config/redis.config";
import { schema } from "./config/env-file.schema";
import { RecipesModule } from "./recipes/recipes.module";
import { GraphQLOptions, ogmaModuleOptions } from "./utils/constants";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [applicationConfig, RedisConfig],
      validationSchema: schema,
      validationOptions: {
        allowUnknown: true,
        stripUnknown: true,
        abortEarly: true,
      },
    }),
    OgmaModule.forRoot(ogmaModuleOptions),
    GraphQLModule.forRoot({
      ...GraphQLOptions,
      context: ({ req, res }) => ({ req, res }),
    }),
    RecipesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
  ],
})
export class AppModule {}
