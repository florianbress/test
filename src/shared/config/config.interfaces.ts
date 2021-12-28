export interface EnvironmentVariables {
  PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  TEST_USER_PASSWORD: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  EMAIL_TOKEN_SECRET: string;
  RESETPASS_TOKEN_SECRET: string;
  UUID_NAMESPACE: string;
  BCRYPT_SALT: string;
  NODEMAILER_HOST: string;
  NODEMAILER_PORT: number;
  NODEMAILER_USER: string;
  NODEMAILER_PASS: string;
}
