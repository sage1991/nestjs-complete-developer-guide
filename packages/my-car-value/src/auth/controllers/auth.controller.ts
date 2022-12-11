import { Body, Controller, Get, HttpCode, HttpStatus, Post, Session } from "@nestjs/common"

import { AuthService } from "../services"
import { SignupRequest, SigninRequest } from "../models"

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
  whoAmI(@Session() session: any) {
    return this.service.whoAmI(session.userId)
  }
}
