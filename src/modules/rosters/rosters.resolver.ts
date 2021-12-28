import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { RostersService } from "./rosters.service";
import { Roster } from "./entities/roster.entity";
import { CreateRosterInput } from "./dto/create-roster.input";
import { UpdateRosterInput } from "./dto/update-roster.input";

@Resolver(() => Roster)
export class RostersResolver {
  constructor(private readonly rostersService: RostersService) {}

  @Mutation(() => Roster)
  createRoster(
    @Args("createRosterInput") createRosterInput: CreateRosterInput
  ) {
    return this.rostersService.create(createRosterInput);
  }

  @Query(() => [Roster], { name: "rosters" })
  findAll() {
    return this.rostersService.findAll();
  }

  @Query(() => Roster, { name: "roster" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.rostersService.findOne(id);
  }

  @Mutation(() => Roster)
  updateRoster(
    @Args("updateRosterInput") updateRosterInput: UpdateRosterInput
  ) {
    return this.rostersService.update(updateRosterInput.id, updateRosterInput);
  }

  @Mutation(() => Roster)
  removeRoster(@Args("id", { type: () => Int }) id: number) {
    return this.rostersService.remove(id);
  }
}
