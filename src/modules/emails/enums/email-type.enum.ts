import { registerEnumType } from "@nestjs/graphql";

export enum EmailType {
  VERIFY_EMAIL = "VERIFY_EMAIL",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
}

registerEnumType(EmailType, { name: "EmailType", description: undefined });
