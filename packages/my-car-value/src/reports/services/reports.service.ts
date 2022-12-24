import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { ApproveReportRequest, CreateReportRequest, GetEstimateRequest, Estimate } from "../models"
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

  estimate({ maker, model, year, lng, lat, mileage }: GetEstimateRequest) {
    return this.repository
      .createQueryBuilder()
      .select("AVG(price)", "average")
      .where("maker = :maker", { maker })
      .andWhere("model = :model", { model })
      .andWhere("year - :year between -3 and 3", { year })
      .andWhere("lng - :lng between -5 and 5", { lng })
      .andWhere("lat - :lat between -5 and 5", { lat })
      .andWhere("approved is true")
      .orderBy("ABS(mileage - :mileage)", "DESC")
      .setParameters({ mileage })
      .limit(3)
      .getRawOne<Estimate>()
  }
}
