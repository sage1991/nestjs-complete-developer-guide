import { Module } from "@nestjs/common"

import { MessagesController } from "./controllers"
import { MessagesService } from "./services"
import { MessagesRepository } from "./repositories"

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository]
})
export class MessagesModule {}
