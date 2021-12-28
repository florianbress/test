import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";

@ObjectType()
export class UserLocked {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Int, { nullable: false })
  duration!: number;

  @Field(() => String, { nullable: false })
  reason!: string;
}
