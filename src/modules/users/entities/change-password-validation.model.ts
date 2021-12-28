import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";

@ObjectType()
export class ChangePasswordValidation {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  pinCode!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Boolean, { nullable: false, defaultValue: true })
  isValid!: boolean;

  @Field(() => String, { nullable: false })
  ip!: string;

  @Field(() => String, { nullable: false })
  userId!: string;
}
