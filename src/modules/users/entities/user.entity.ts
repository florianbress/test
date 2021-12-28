import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { Email } from "../../emails/entities/email.entity";
import { MatchChatEntry } from "../../matches/entities/match-chat-entry.model";
import { MatchLogEntry } from "../../matches/entities/match-log-entry.model";
import { OrganizationInvitation } from "../../organizations/entities/organization-invitation.model";
import { OrganizationMembership } from "../../organizations/entities/organization-membership.model";
import { Organization } from "../../organizations/entities/organization.entity";
import { RosterLogEntry } from "../../rosters/entities/roster-log-entry.entity";
import { RosterMembership } from "../../rosters/entities/roster-membership.entity";
import { TeamMembership } from "../../teams/entities/team-membership.entity";
import { Team } from "../../teams/entities/team.entity";
import { UserRole } from "../enums/user-role.enum";
import { DeletedUser } from "./deleted-user.entity";
import { EpicGames } from "./epic-games.entity";
import { Local } from "./local.entity";

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  uuid!: string;

  @Field(() => String, { nullable: false })
  username!: string;

  @Field(() => String, { nullable: true })
  firstName!: string | null;

  @Field(() => String, { nullable: true })
  lastName!: string | null;

  @Field(() => Local, { nullable: true })
  local?: Local | null;

  @Field(() => EpicGames, { nullable: true })
  epicGames?: EpicGames | null;

  @Field(() => String, { nullable: true })
  epicId!: string | null;

  @Field(() => String, { nullable: true })
  image!: string | null;

  @Field(() => UserRole, { nullable: true, defaultValue: "User" })
  role!: keyof typeof UserRole | null;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isVerified!: boolean | null;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isActive!: boolean | null;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isLocked!: boolean | null;

  @Field(() => String, { nullable: true })
  resetPasswordToken!: string | null;

  @Field(() => Float, { nullable: true })
  resetPasswordExpires!: number | null;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  passwordResetFlag!: boolean | null;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => [Team], { nullable: true })
  IsTeamOwnerFrom?: Array<Team>;

  @Field(() => Team, { nullable: true })
  IsTeamLeaderFrom?: Team | null;

  @Field(() => Team, { nullable: true })
  IsTeamCoLeaderFrom?: Team | null;

  @Field(() => Organization, { nullable: true })
  IsOrgOwnerFrom?: Organization | null;

  @Field(() => [TeamMembership], { nullable: true })
  TeamMembership?: Array<TeamMembership>;

  @Field(() => [RosterMembership], { nullable: true })
  RosterMembership?: Array<RosterMembership>;

  @Field(() => [RosterLogEntry], { nullable: true })
  RosterLogEntryCreated?: Array<RosterLogEntry>;

  @Field(() => [RosterLogEntry], { nullable: true })
  RosterLogEntryTarget?: Array<RosterLogEntry>;

  @Field(() => [MatchLogEntry], { nullable: true })
  MatchLogEntryCreated?: Array<MatchLogEntry>;

  @Field(() => [MatchLogEntry], { nullable: true })
  MatchLogEntryTarget?: Array<MatchLogEntry>;

  @Field(() => [OrganizationMembership], { nullable: true })
  OrganizationMembership?: Array<OrganizationMembership>;

  @Field(() => [OrganizationInvitation], { nullable: true })
  OrganizationInvitation?: Array<OrganizationInvitation>;

  @Field(() => [DeletedUser], { nullable: true })
  DeletedUser?: Array<DeletedUser>;

  @Field(() => [MatchChatEntry], { nullable: true })
  Chat?: Array<MatchChatEntry>;

  @Field(() => [Email], { nullable: true })
  Email?: Array<Email>;
}
