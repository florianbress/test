import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { OgmaService } from "@ogma/nestjs-module";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
  });
  const logger = app.get<OgmaService>(OgmaService);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
  logger.log(`🚀 Backend ready at ${await app.getUrl()}/graphql`);
}
bootstrap();
