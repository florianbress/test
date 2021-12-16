export interface EnvironmentVariables {
  PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  TEST_USER_PASSWORD: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  UUID_NAMESPACE: string;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
  MAIL_HOST: string;
  MAIL_PORT: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
}
