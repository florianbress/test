import { registerAs } from "@nestjs/config";

export type RedisConfig = {
  host: string;
  port: number;
};
export default registerAs<RedisConfig>("redis", () => ({
  host: String(process.env.REDIS_HOST),
  port: Number(process.env.REDIS_PORT),
}));
