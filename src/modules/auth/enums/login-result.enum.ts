import { registerEnumType } from "@nestjs/graphql";

export enum LoginResult {
  Rejected = "Rejected",
  Unknown = "Unknown",
  Granted = "Granted",
  Unauthorized = "Unauthorized",
}

registerEnumType(LoginResult, { name: "LoginResult", description: undefined });
