import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { Roster } from "./roster.entity";

@ObjectType()
export class RosterMembership {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Int, { nullable: false })
  rosterId!: number;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Roster, { nullable: false })
  Roster?: Roster;

  @Field(() => User, { nullable: false })
  User?: User;
}
