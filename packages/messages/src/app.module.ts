import { Module, ValidationPipe } from "@nestjs/common"
import { APP_PIPE } from "@nestjs/core"

import { MessagesModule } from "./messages/messages.module"

@Module({
  imports: [MessagesModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
