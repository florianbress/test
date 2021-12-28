import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SeasonsService } from "./seasons.service";
import { Season } from "./entities/season.entity";
import { CreateSeasonInput } from "./dto/create-season.input";
import { UpdateSeasonInput } from "./dto/update-season.input";

@Resolver(() => Season)
export class SeasonsResolver {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Mutation(() => Season)
  createSeason(
    @Args("createSeasonInput") createSeasonInput: CreateSeasonInput
  ) {
    return this.seasonsService.create(createSeasonInput);
  }

  @Query(() => [Season], { name: "seasons" })
  findAll() {
    return this.seasonsService.findAll();
  }

  @Query(() => Season, { name: "season" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.seasonsService.findOne(id);
  }

  @Mutation(() => Season)
  updateSeason(
    @Args("updateSeasonInput") updateSeasonInput: UpdateSeasonInput
  ) {
    return this.seasonsService.update(updateSeasonInput.id, updateSeasonInput);
  }

  @Mutation(() => Season)
  removeSeason(@Args("id", { type: () => Int }) id: number) {
    return this.seasonsService.remove(id);
  }
}
