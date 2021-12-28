import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { User } from "./user.entity";

@ObjectType()
export class DeletedUser {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  username!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => User, { nullable: false })
  User?: User;
}
