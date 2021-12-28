import { CreateDivisionGroupInput } from "./create-division-group.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateDivisionGroupInput extends PartialType(
  CreateDivisionGroupInput
) {
  @Field(() => Int)
  id: number;
}
