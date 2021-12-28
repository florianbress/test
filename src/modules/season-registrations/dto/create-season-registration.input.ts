import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateSeasonRegistrationInput {
  @Field(() => Int, { description: "Example field (placeholder)" })
  exampleField: number;
}
