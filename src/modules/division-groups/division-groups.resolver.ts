import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DivisionGroupsService } from "./division-groups.service";
import { DivisionGroup } from "./entities/division-group.entity";
import { CreateDivisionGroupInput } from "./dto/create-division-group.input";
import { UpdateDivisionGroupInput } from "./dto/update-division-group.input";

@Resolver(() => DivisionGroup)
export class DivisionGroupsResolver {
  constructor(private readonly divisionGroupsService: DivisionGroupsService) {}

  @Mutation(() => DivisionGroup)
  createDivisionGroup(
    @Args("createDivisionGroupInput")
    createDivisionGroupInput: CreateDivisionGroupInput
  ) {
    return this.divisionGroupsService.create(createDivisionGroupInput);
  }

  @Query(() => [DivisionGroup], { name: "divisionGroups" })
  findAll() {
    return this.divisionGroupsService.findAll();
  }

  @Query(() => DivisionGroup, { name: "divisionGroup" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.divisionGroupsService.findOne(id);
  }

  @Mutation(() => DivisionGroup)
  updateDivisionGroup(
    @Args("updateDivisionGroupInput")
    updateDivisionGroupInput: UpdateDivisionGroupInput
  ) {
    return this.divisionGroupsService.update(
      updateDivisionGroupInput.id,
      updateDivisionGroupInput
    );
  }

  @Mutation(() => DivisionGroup)
  removeDivisionGroup(@Args("id", { type: () => Int }) id: number) {
    return this.divisionGroupsService.remove(id);
  }
}
