import { isDevEnv } from "../utils/constants";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: isDevEnv ? ["error", "warn", "info", "query"] : ["error", "warn"],
      errorFormat: isDevEnv ? "pretty" : "minimal",
    });
  }
}
