import { CreateRosterInput } from "./create-roster.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateRosterInput extends PartialType(CreateRosterInput) {
  @Field(() => Int)
  id: number;
}
