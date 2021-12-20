import {
  Field,
  Float,
  Int,
  ObjectType,
  registerEnumType
} from "@nestjs/graphql";
import { DeletedUser } from "./deletedUser.model";
import { EpicGames } from "./epicGames.model";
import { Local } from "./local.model";

enum RoleType {
  Owner = "Owner",
  Admin = "Admin",
  Staff = "Staff",
  Redaktion = "Redaktion",
  Developer = "Developer",
  Streamer = "Streamer",
  User = "User",
  Banned = "Banned",
  Gast = "Gast",
}

registerEnumType(RoleType, {
  name: "RoleType",
  description: undefined,
});

@ObjectType({ description: undefined })
export class User {
  @Field()
  uuid: String;

  @Field()
  username: String;

  @Field({ nullable: true })
  firstName?: String;

  @Field()
  lastName?: String;

  @Field((type) => Local)
  local?: Local;

  @Field((type) => EpicGames)
  epicGames?: EpicGames;

  @Field()
  image?: String;

  @Field((type) => RoleType)
  role?: RoleType;

  @Field((type) => Int)
  isVerified?: Boolean;

  @Field((type) => Int)
  isActive?: Boolean;

  @Field((type) => Int)
  isLocked?: Boolean;

  @Field((type) => Int)
  resetPasswordToken?: String;

  @Field((type) => Float)
  resetPasswordExpires?: number;

  @Field((type) => Int)
  validatedFlag?: Boolean;

  @Field((type) => Int)
  passwordResetFlag?: Boolean;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;

  // @Field((type) => [Team], { nullable: true })
  // IsTeamOwnerFrom?: Team[];

  // @Field((type) => Team)
  // IsTeamLeaderFrom?: Team;

  // @Field((type) => Team)
  // IsTeamCoLeaderFrom?: Team;

  // @Field((type) => Organization)
  // IsOrgOwnerFrom?: Organization;

  // @Field((type) => [TeamMembership], { nullable: true })
  // TeamMembership?: TeamMembership[];

  // @Field((type) => [RosterMembership], { nullable: true })
  // RosterMembership?: RosterMembership[];

  // @Field((type) => [RosterLogEntry], { nullable: true })
  // RosterLogEntryCreated?: RosterLogEntry[];

  // @Field((type) => [RosterLogEntry], { nullable: true })
  // RosterLogEntryTarget?: RosterLogEntry[];

  // @Field((type) => [MatchLogEntry], { nullable: true })
  // MatchLogEntryCreated?: MatchLogEntry[];

  // @Field((type) => [MatchLogEntry], { nullable: true })
  // MatchLogEntryTarget?: MatchLogEntry[];

  // @Field((type) => [OrganizationMembership], { nullable: true })
  // OrganizationMembership?: OrganizationMembership[];

  // @Field((type) => [OrganizationInvitation], { nullable: true })
  // OrganizationInvitation?: OrganizationInvitation[];

  @Field((type) => [DeletedUser], { nullable: true })
  DeletedUser?: DeletedUser[];

  // @Field((type) => [MatchChatEntry], { nullable: true })
  // Chat?: MatchChatEntry[];

  // @Field((type) => [Email], { nullable: true })
  // Email?: Email[];
}
