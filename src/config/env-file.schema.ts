import * as Joi from "joi";

export const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test", "provision")
    .default("development"),
  PORT: Joi.number(),
  JWT_SECRET: Joi.string(),
  TEST_USER_PASSWORD: Joi.string(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string(),
  UUID_NAMESPACE: Joi.string(),
});
