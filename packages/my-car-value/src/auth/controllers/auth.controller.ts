import { Body, Controller, Post } from "@nestjs/common"

import { AuthService } from "../services"
import { SignupRequest, SigninRequest } from "../models"

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("/signup")
  signup(@Body() request: SignupRequest) {
    return this.service.signup(request)
  }

  @Post("/signin")
  signin(@Body() request: SigninRequest) {
    return this.service.signin(request)
  }
}
