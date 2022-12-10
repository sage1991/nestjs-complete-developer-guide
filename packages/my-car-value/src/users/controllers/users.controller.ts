import { Body, Controller, Post } from "@nestjs/common"

import { CreateUserRequest } from "../models"
import { UsersService } from "../services"

@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() request: CreateUserRequest) {
    return this.service.create(request)
  }
}
