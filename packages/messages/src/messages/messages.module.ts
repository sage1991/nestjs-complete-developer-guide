import { Module } from "@nestjs/common"

import { MessagesController } from "./controllers"
import { MessagesService } from "./services"

@Module({
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
