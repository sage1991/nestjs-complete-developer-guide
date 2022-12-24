import {
  ArgumentMetadata,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from "@nestjs/common"

import { ApproveReportRequest, CreateReportRequest, GetEstimateRequest } from "../models"
import { ReportsService } from "../services"
import { AuthGuard, CurrentUser, AdminGuard } from "../../core"
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
  @UseGuards(AdminGuard)
  approve(
    @CurrentUser() user: User,
    @Param("id", ParseIntPipe) id: number,
    @Body() request: ApproveReportRequest
  ) {
    return this.service.approve(user, id, request)
  }

  @Get()
  estimate(@Query() query: GetEstimateRequest) {
    return this.service.estimate(query)
  }
}
