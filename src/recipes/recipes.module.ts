import { Module } from "@nestjs/common";
import { OgmaModule } from "@ogma/nestjs-module";
import { DateScalar } from "../common/scalars/date.scalar";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesService } from "./recipes.service";

@Module({
  providers: [RecipesResolver, RecipesService, DateScalar],
  imports: [OgmaModule.forFeature(RecipesService.name)],
})
export class RecipesModule {}
