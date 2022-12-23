import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { CreateReportRequest } from "../models"
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
}
