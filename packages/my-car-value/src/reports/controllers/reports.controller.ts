import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common"

import { ApproveReportRequest, CreateReportRequest } from "../models"
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

  @Patch("/:id")
  approve(
    @CurrentUser() user: User,
    @Param("id", ParseIntPipe) id: number,
    @Body() request: ApproveReportRequest
  ) {
    return this.service.approve(user, id, request)
  }
}
