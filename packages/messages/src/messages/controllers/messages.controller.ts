import { Controller, Get, Post } from "@nestjs/common"

@Controller("messages")
export class MessagesController {
  @Get()
  findAll() {
    return "find all messages"
  }

  @Get("/:id")
  findOne() {
    return "find one messages"
  }

  @Post()
  create() {
    return "create message"
  }
}
