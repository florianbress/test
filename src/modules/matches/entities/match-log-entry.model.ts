import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { GraphQLJSON } from "graphql-type-json";
import { Int } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { Match } from "./match.entity";
import { Team } from "../../teams/entities/team.entity";

@ObjectType()
export class MatchLogEntry {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  extraData!: any | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Date, { nullable: true })
  proposeMatchDate!: Date | null;

  @Field(() => String, { nullable: true })
  rosterId!: string | null;

  @Field(() => String, { nullable: false })
  createdById!: string;

  @Field(() => String, { nullable: true })
  targetUserId!: string | null;

  @Field(() => Int, { nullable: false })
  matchId!: number;

  @Field(() => User, { nullable: false })
  CreatedBy?: User;

  @Field(() => User, { nullable: true })
  TargetUser?: User | null;

  @Field(() => Match, { nullable: false })
  Match?: Match;

  @Field(() => Team, { nullable: true })
  Roster?: Team | null;
}
