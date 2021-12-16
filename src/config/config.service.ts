import { ConfigService as CoreConfigService } from "@nestjs/config";
import type { EnvironmentVariables } from "./config.interfaces";
import type { AppConfig } from "./config/application.config";
import { RedisConfig } from "./config/redis.config";

/**
 * A type in which every key is the config token registered with `registerAs`
 * helper from `@nestjs/config` package.
 */
type ConfigServiceKeys = {
  app: AppConfig;
  redis: RedisConfig;
};

// Narrowing the generics `ConfigService` interface from `@nestjs/config` package
export type ConfigService = CoreConfigService<
  ConfigServiceKeys & EnvironmentVariables,
  true
>;

// Re-exporting `ConfigService` class, but with the proper type argument
export const ConfigService = CoreConfigService;
