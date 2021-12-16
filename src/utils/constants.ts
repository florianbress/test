import { GqlModuleOptions } from "@nestjs/graphql";
import { OgmaModuleOptions } from "@ogma/nestjs-module";
import { ExpressParser } from "@ogma/platform-express";
import { GraphQLParser } from "@ogma/platform-graphql";
import { EnvironmentVariables } from "../config/config.interfaces";
import { $envVars } from "../config/env-file.schema";

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

type SchemaProps = keyof EnvironmentVariables;

/**
 * Helper to retrive an environment value (living under `process.env`) that was
 * expect to have. The value itself will be 'parsed' since all env. vars. loaded
 * from some dot env file are strings. This is an workaround to the limitation
 * where _config factory_ (from `@nestjs/config` lib) don't have access to the
 * parsed values that will be configured by `ConfigService` provider due to
 * this snippet: {@link https://github.com/nestjs/config/blob/2a5a7e10d1098b20b953d66438487264364aa6d9/lib/utils/create-config-factory.util.ts#L7-L16}
 *
 * Do notice that since this isn't memoized, every call of `getEnv(x)` leads to
 * a new validation process, even tho the value was validated already.
 */
export const getEnv = <T extends SchemaProps = SchemaProps>(
  envKey: T
): EnvironmentVariables[T] => {
  const schema = $envVars[envKey as any];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { error, value: sanitizedValue } = schema.validate(process.env[envKey]);
  // This should be always false since the validations using the same schema will
  // happen beforehand.
  if (error) {
    throw error;
  }
  // The transformed value
  return sanitizedValue as EnvironmentVariables[T];
};
