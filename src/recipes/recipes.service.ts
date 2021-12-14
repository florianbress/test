import { Injectable } from "@nestjs/common";
import { OgmaLogger, OgmaService } from "@ogma/nestjs-module";
import { NewRecipeInput } from "./dto/new-recipe.input";
import { RecipesArgs } from "./dto/recipes.args";
import { Recipe } from "./models/recipe.model";

@Injectable()
export class RecipesService {
  private readonly recipes: Recipe[] = [];

  constructor(
    @OgmaLogger(RecipesService) private readonly logger: OgmaService
  ) {}

  async create(data: NewRecipeInput): Promise<Recipe> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Recipe> {
    return {} as any;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    this.logger.silly("Silly!");
    this.logger.error("Error!");
    this.logger.verbose("Verbose!");
    this.logger.fatal("Fatal!");
    return this.recipes;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
