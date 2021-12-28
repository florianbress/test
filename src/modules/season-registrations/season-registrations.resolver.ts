import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SeasonRegistrationsService } from "./season-registrations.service";
import { SeasonRegistration } from "./entities/season-registration.entity";
import { CreateSeasonRegistrationInput } from "./dto/create-season-registration.input";
import { UpdateSeasonRegistrationInput } from "./dto/update-season-registration.input";

@Resolver(() => SeasonRegistration)
export class SeasonRegistrationsResolver {
  constructor(
    private readonly seasonRegistrationsService: SeasonRegistrationsService
  ) {}

  @Mutation(() => SeasonRegistration)
  createSeasonRegistration(
    @Args("createSeasonRegistrationInput")
    createSeasonRegistrationInput: CreateSeasonRegistrationInput
  ) {
    return this.seasonRegistrationsService.create(
      createSeasonRegistrationInput
    );
  }

  @Query(() => [SeasonRegistration], { name: "seasonRegistrations" })
  findAll() {
    return this.seasonRegistrationsService.findAll();
  }

  @Query(() => SeasonRegistration, { name: "seasonRegistration" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.seasonRegistrationsService.findOne(id);
  }

  @Mutation(() => SeasonRegistration)
  updateSeasonRegistration(
    @Args("updateSeasonRegistrationInput")
    updateSeasonRegistrationInput: UpdateSeasonRegistrationInput
  ) {
    return this.seasonRegistrationsService.update(
      updateSeasonRegistrationInput.id,
      updateSeasonRegistrationInput
    );
  }

  @Mutation(() => SeasonRegistration)
  removeSeasonRegistration(@Args("id", { type: () => Int }) id: number) {
    return this.seasonRegistrationsService.remove(id);
  }
}
