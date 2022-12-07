import { Body, Controller, Get, Param, Post } from "@nestjs/common"

import { CreateMessageRequest } from "../models"
import { MessagesService } from "../services"

@Controller("messages")
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get("/:id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id)
  }

  @Post()
  create(@Body() request: CreateMessageRequest) {
    return this.service.create(request)
  }
}
