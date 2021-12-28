import * as Joi from "joi";

export const $envVars = {
  NODE_ENV: Joi.string()
    .valid("development", "production", "test", "provision")
    .default("development"),
  PORT: Joi.number(),
  JWT_SECRET: Joi.string(),
  TEST_USER_PASSWORD: Joi.string(),
  ACCESS_TOKEN_SECRET: Joi.string(),
  REFRESH_TOKEN_SECRET: Joi.string(),
  EMAIL_TOKEN_SECRET: Joi.string(),
  RESETPASS_TOKEN_SECRET: Joi.string(),
  UUID_NAMESPACE: Joi.string(),
  BCRYPT_SALT: Joi.string(),
  NODEMAILER_HOST: Joi.string(),
  NODEMAILER_PORT: Joi.number(),
  NODEMAILER_USER: Joi.string(),
  NODEMAILER_PASS: Joi.string(),
};

const SchemaValidationOpts: Joi.ValidationOptions = {
  presence: "required",
  allowUnknown: true,
  stripUnknown: true,
  abortEarly: true,
};

export const envFileSchema = Joi.object($envVars).options(SchemaValidationOpts);
