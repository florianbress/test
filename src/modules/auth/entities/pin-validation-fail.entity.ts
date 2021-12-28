import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";

@ObjectType()
export class PinValidationFail {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Int, { nullable: false })
  count!: number;

  @Field(() => String, { nullable: false })
  userId!: string;
}
