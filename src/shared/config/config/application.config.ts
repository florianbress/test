import { registerAs } from "@nestjs/config";
import { getEnv } from "../../../utils/constants";

export type AppConfig = {
  port: number;
  jwtSecret: string;
  accessToken: string;
  refreshToken: string;
  emailToken: string;
  resetPassToken: string;
  testUserPassword: string;
  uuidNameSpace: string;
  bcryptSalt: string;
  nodeMailerHost: string;
  nodeMailerPort: number;
  nodeMailerUser: string;
  nodeMailerPass: string;
};

export default registerAs<AppConfig>("app", () => ({
  port: getEnv("PORT"),
  jwtSecret: getEnv("JWT_SECRET"),
  accessToken: getEnv("ACCESS_TOKEN_SECRET"),
  refreshToken: getEnv("REFRESH_TOKEN_SECRET"),
  emailToken: getEnv("EMAIL_TOKEN_SECRET"),
  resetPassToken: getEnv("RESETPASS_TOKEN_SECRET"),
  testUserPassword: getEnv("TEST_USER_PASSWORD"),
  uuidNameSpace: getEnv("UUID_NAMESPACE"),
  bcryptSalt: getEnv("BCRYPT_SALT"),
  nodeMailerHost: getEnv("NODEMAILER_HOST"),
  nodeMailerPort: getEnv("NODEMAILER_PORT"),
  nodeMailerUser: getEnv("NODEMAILER_USER"),
  nodeMailerPass: getEnv("NODEMAILER_PASS"),
}));
