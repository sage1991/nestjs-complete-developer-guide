import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UseGuards
} from "@nestjs/common"

import { CurrentUser, AuthGuard } from "../../core"
import { AuthService } from "../services"
import { SignupRequest, SigninRequest } from "../models"
import { User } from "../../users/models"

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/signup")
  async signup(@Body() request: SignupRequest, @Session() session: any) {
    const user = await this.service.signup(request)
    session.userId = user.id
    return user
  }

  @Post("/signin")
  @HttpCode(HttpStatus.OK)
  async signin(@Body() request: SigninRequest, @Session() session: any) {
    const user = await this.service.signin(request)
    session.userId = user.id
    return user
  }

  @Post("/signout")
  @HttpCode(HttpStatus.OK)
  async signout(@Session() session: any) {
    session.userId = null
  }

  @Get()
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user
  }
}
