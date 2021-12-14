import { GqlModuleOptions } from "@nestjs/graphql";
import { OgmaModuleOptions } from "@ogma/nestjs-module";
import { ExpressParser } from "@ogma/platform-express";
import { GraphQLParser } from "@ogma/platform-graphql";
import { join } from "path";

export const isDevEnv = process.env.NODE_ENV === "development";

export enum ErrorCodes {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_CREATION_ERROR = "USER_CREATION_ERROR",
  PINCODE_CREATION_ERROR = "PINCODE_CREATION_ERROR",
  PINCODE_NOT_FOUND = "PINCODE_NOT_FOUND",
  PINCODE_MATCHES = "PINCODE_MATCHES",
  PINCODE_NO_MATCH = "PINCODE_NO_MATCH",
  LOGIN_RESULT_ERROR = "LOGIN_RESULT_ERROR",
  ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
  PASSWORD_RESET = "PASSWORD_RESET",
  NOT_VALIDATED = "NOT_VALIDATED",
  LOGIN_FAILED = "LOGIN_FAILED",
  VALIDATION_NEEDED = "VALIDATION_NEEDED",
  LOGIN_REQUEST_ERROR = "LOGIN_REQUEST_ERROR",
  BAD_IDENTIFIER = "BAD_IDENTIFIER",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
  VALIDATE_USER_ERROR = "VALIDATE_USER_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  NO_MATCH = "NO_MATCH",
  TOS_NOT_FOUND = "TOS_NOT_FOUND",
  TOS_NOT_ACCEPTED = "TOS_NOT_ACCEPTED",
  TOU_NOT_FOUND = "TOU_NOT_FOUND",
  TOU_NOT_ACCEPTED = "TOU_NOT_ACCEPTED",
  DP_NOT_FOUND = "DP_NOT_FOUND",
  DP_NOT_ACCEPTED = "DP_NOT_ACCEPTED",
  FLAG_CREATION_ERROR = "FLAG_CREATION_ERROR",
  PWVALIDATION_NOT_FOUND = "PWVALIDATION_NOT_FOUND",
  INVALID_USERNAME = "INVALID_USERNAME",
  ALREADY_REGISTERED = "ALREADY_REGISTERED",
  PASSWORD_UPDATE_ERROR = "PASSWORD_UPDATE_ERROR",
  INVALID_EMAIL = "INVALID_EMAIL",
  CANNOT_CLAIM_ACCOUNT = "CANNOT_CLAIM_ACCOUNT",
}

export const ogmaModuleOptions: OgmaModuleOptions = {
  service: {
    color: true,
    json: false,
    application: "Nitroleague",
  },
  interceptor: {
    http: ExpressParser,
    ws: false,
    gql: GraphQLParser,
    rpc: false,
  },
};

/* Options for the Apollo Server */
export const GraphQLOptions: GqlModuleOptions = {
  installSubscriptionHandlers: true,
  autoSchemaFile: "schema.gql",
};
