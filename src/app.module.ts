import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { OgmaInterceptor, OgmaModule } from "@ogma/nestjs-module";
import { RecipesModule } from "./recipes/recipes.module";
import { ogmaModuleOptions } from "./utils/constants";

@Module({
  imports: [
    OgmaModule.forRoot(ogmaModuleOptions),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.gql",
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
