import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"

import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets(process.env.PUBLIC_PATH, { prefix: "/public" })
  await app.listen(3000)
}
bootstrap()
