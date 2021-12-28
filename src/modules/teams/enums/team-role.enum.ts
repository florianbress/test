import { registerEnumType } from "@nestjs/graphql";

export enum TeamRole {
  Owner = "Owner",
  Leader = "Leader",
  CoLeader = "CoLeader",
  Member = "Member",
}

registerEnumType(TeamRole, { name: "TeamRole", description: undefined });
