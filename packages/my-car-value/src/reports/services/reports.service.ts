import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { ApproveReportRequest, CreateReportRequest } from "../models"
import { ReportEntity } from "../entities"
import { User } from "../../users/models"

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity) private readonly repository: Repository<ReportEntity>
  ) {}

  create(user: User, request: CreateReportRequest) {
    return this.repository.save(this.repository.create({ ...request, user }))
  }

  async approve(user: User, id: number, { approved }: ApproveReportRequest) {
    const report = await this.repository.findOne({ where: { id } })
    if (!report) {
      throw new NotFoundException(`Cannot find report for given id: ${id}`)
    }
    report.approved = approved
    return this.repository.save(report)
  }
}
