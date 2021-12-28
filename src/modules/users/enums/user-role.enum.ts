import { registerEnumType } from "@nestjs/graphql";

export enum UserRole {
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

registerEnumType(UserRole, { name: "UserRole", description: undefined });
