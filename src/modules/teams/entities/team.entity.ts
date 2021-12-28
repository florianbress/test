import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";
import { DivisionGroup } from "../../division-groups/entities/division-group.entity";
import { Division } from "../../divisions/entities/division.entity";
import { MatchLogEntry } from "../../matches/entities/match-log-entry.model";
import { Match } from "../../matches/entities/match.entity";
import { Organization } from "../../organizations/entities/organization.entity";
import { Roster } from "../../rosters/entities/roster.entity";
import { SeasonRegistration } from "../../season-registrations/entities/season-registration.entity";
import { User } from "../../users/entities/user.entity";
import { TeamInviteCode } from "./team-invite-code.entity";
import { TeamMembership } from "./team-membership.entity";

@ObjectType()
export class Team {
  @Field(() => ID, { nullable: false })
  uuid!: string;

  @Field(() => String, { nullable: true })
  name!: string | null;

  @Field(() => String, { nullable: true })
  image!: string | null;

  @Field(() => String, { nullable: true })
  tag!: string | null;

  @Field(() => String, { nullable: false })
  identifier!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => String, { nullable: true })
  ownerId!: string | null;

  @Field(() => String, { nullable: true })
  leaderId!: string | null;

  @Field(() => String, { nullable: true })
  coleaderId!: string | null;

  @Field(() => Int, { nullable: true })
  divisionId!: number | null;

  @Field(() => Int, { nullable: true })
  divisionGroupId!: number | null;

  @Field(() => String, { nullable: true })
  organizationId!: string | null;

  @Field(() => User, { nullable: true })
  Admin?: User | null;

  @Field(() => User, { nullable: true })
  Leader?: User | null;

  @Field(() => User, { nullable: true })
  Coleader?: User | null;

  @Field(() => [TeamMembership], { nullable: true })
  TeamMembership?: Array<TeamMembership>;

  @Field(() => [TeamInviteCode], { nullable: true })
  TeamInvitation?: Array<TeamInviteCode>;

  @Field(() => [Roster], { nullable: true })
  Roster?: Array<Roster>;

  @Field(() => [SeasonRegistration], { nullable: true })
  SeasonRegistration?: Array<SeasonRegistration>;

  @Field(() => Division, { nullable: true })
  Division?: Division | null;

  @Field(() => DivisionGroup, { nullable: true })
  DivisionGroup?: DivisionGroup | null;

  @Field(() => Organization, { nullable: true })
  Organization?: Organization | null;

  @Field(() => [Match], { nullable: true })
  Home?: Array<Match>;

  @Field(() => [Match], { nullable: true })
  Away?: Array<Match>;

  @Field(() => [Match], { nullable: true })
  Winner?: Array<Match>;

  @Field(() => [MatchLogEntry], { nullable: true })
  MatchLogEntry?: Array<MatchLogEntry>;
}
