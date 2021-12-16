import * as Joi from "joi";

export const $envVars = {
  NODE_ENV: Joi.string()
    .valid("development", "production", "test", "provision")
    .default("development"),
  PORT: Joi.number(),
  JWT_SECRET: Joi.string(),
  TEST_USER_PASSWORD: Joi.string(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string(),
  UUID_NAMESPACE: Joi.string(),
};

const SchemaValidationOpts: Joi.ValidationOptions = {
  presence: "required",
  allowUnknown: true,
  stripUnknown: true,
  abortEarly: true,
};

export const envFileSchema = Joi.object($envVars).options(SchemaValidationOpts);
