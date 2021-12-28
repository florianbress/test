import { CreateSeasonRegistrationInput } from "./create-season-registration.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateSeasonRegistrationInput extends PartialType(
  CreateSeasonRegistrationInput
) {
  @Field(() => Int)
  id: number;
}
