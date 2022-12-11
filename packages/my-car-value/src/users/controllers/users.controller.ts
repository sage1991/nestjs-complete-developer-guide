import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Query } from "@nestjs/common"

import { FindUserRequest, UpdateUserRequest } from "../models"
import { UsersService } from "../services"

@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  findAll(@Query() request: FindUserRequest) {
    return this.service.findAll(request)
  }

  @Get("/:id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch("/:id")
  update(@Param("id", ParseIntPipe) id: number, @Body() request: UpdateUserRequest) {
    return this.service.update(id, request)
  }

  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
