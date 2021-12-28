import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";
import { DivisionGroup } from "../../division-groups/entities/division-group.entity";
import { Team } from "../../teams/entities/team.entity";
import { RosterLogEntry } from "./roster-log-entry.entity";
import { RosterMembership } from "./roster-membership.entity";

@ObjectType()
export class Roster {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => String, { nullable: false })
  teamId!: string;

  @Field(() => Int, { nullable: true })
  divisionGroupId!: number | null;

  @Field(() => DivisionGroup, { nullable: true })
  DivisionGroup?: DivisionGroup | null;

  @Field(() => Team, { nullable: false })
  Team?: Team;

  @Field(() => [RosterMembership], { nullable: true })
  RosterMembership?: Array<RosterMembership>;

  @Field(() => [RosterLogEntry], { nullable: true })
  RosterLogEntry?: Array<RosterLogEntry>;
}
