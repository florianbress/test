import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateDivisionGroupInput {
  @Field(() => Int, { description: "Example field (placeholder)" })
  exampleField: number;
}
