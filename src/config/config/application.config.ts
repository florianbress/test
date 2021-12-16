import { registerAs } from "@nestjs/config";
import { getEnv } from "../../utils/constants";

export type AppConfig = {
  port: number;
  jwtSecret: string;
  jwtAccessToken: string;
  jwtRefreshToken: string;
  testUserPassword: string;
  uuidNameSpace: string;
};

export default registerAs<AppConfig>("app", () => ({
  port: getEnv("PORT"),
  jwtSecret: getEnv("JWT_SECRET"),
  jwtAccessToken: getEnv("JWT_ACCESS_TOKEN_SECRET"),
  jwtRefreshToken: getEnv("JWT_REFRESH_TOKEN_SECRET"),
  testUserPassword: getEnv("TEST_USER_PASSWORD"),
  uuidNameSpace: getEnv("UUID_NAMESPACE"),
}));
