import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { ReportsController } from "./controllers"
import { ReportsService } from "./services"
import { ReportEntity } from "./entities"

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
