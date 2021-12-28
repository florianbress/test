import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";
import { DivisionGroup } from "../../division-groups/entities/division-group.entity";
import { Team } from "../../teams/entities/team.entity";
import { MatchChatEntry } from "./match-chat-entry.model";
import { MatchLogEntry } from "./match-log-entry.model";

@ObjectType()
export class Match {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: true })
  identifier!: string | null;

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  week!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Date, { nullable: true })
  matchDate!: Date | null;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  acceptedByHome!: boolean | null;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  acceptedByAway!: boolean | null;

  @Field(() => Int, { nullable: true })
  scoreHome!: number | null;

  @Field(() => Int, { nullable: true })
  scoreAway!: number | null;

  @Field(() => Boolean, { nullable: true })
  defwin!: boolean | null;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  approvedByHome!: boolean;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  approvedByAway!: boolean;

  @Field(() => String, { nullable: true })
  winnerId!: string | null;

  @Field(() => Int, { nullable: false })
  divisionGroupId!: number;

  @Field(() => String, { nullable: false })
  rosterHomeId!: string;

  @Field(() => String, { nullable: false })
  rosterAwayId!: string;

  @Field(() => DivisionGroup, { nullable: false })
  DivisionGroup?: DivisionGroup;

  @Field(() => Team, { nullable: false })
  RosterHome?: Team;

  @Field(() => Team, { nullable: false })
  RosterAway?: Team;

  @Field(() => Team, { nullable: true })
  Winner?: Team | null;

  @Field(() => [MatchLogEntry], { nullable: true })
  MatchLogEntry?: Array<MatchLogEntry>;

  @Field(() => [MatchChatEntry], { nullable: true })
  Chat?: Array<MatchChatEntry>;
}
