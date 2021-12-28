import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { OgmaService } from "@ogma/nestjs-module";
import { AppModule } from "./app.module";
import { ConfigService } from "./shared/config/config.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get<OgmaService>(OgmaService);
  app.useLogger(logger);

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get("app.port", { infer: true });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.log(`🚀 Backend ready at ${await app.getUrl()}/graphql`);
}
bootstrap();
