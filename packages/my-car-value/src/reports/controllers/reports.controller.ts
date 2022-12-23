import { Body, Controller, Post, UseGuards } from "@nestjs/common"

import { CreateReportRequest } from "../models"
import { ReportsService } from "../services"
import { AuthGuard, CurrentUser } from "../../core"
import { User } from "../../users/models"

@UseGuards(AuthGuard)
@Controller("reports")
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() request: CreateReportRequest) {
    return this.service.create(user, request)
  }
}
