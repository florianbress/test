import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { GraphQLJSON } from "graphql-type-json";
import { User } from "../../users/entities/user.entity";
import { Roster } from "./roster.entity";

@ObjectType()
export class RosterLogEntry {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  extraData!: any | null;

  @Field(() => String, { nullable: false })
  createdById!: string;

  @Field(() => String, { nullable: true })
  targetUserId!: string | null;

  @Field(() => Int, { nullable: false })
  rosterId!: number;

  @Field(() => User, { nullable: false })
  CreatedBy?: User;

  @Field(() => User, { nullable: true })
  TargetUser?: User | null;

  @Field(() => Roster, { nullable: false })
  Roster?: Roster;
}
