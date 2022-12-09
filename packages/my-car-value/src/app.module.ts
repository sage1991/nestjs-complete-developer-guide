import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UsersModule } from "./users"
import { ReportsModule } from "./reports"
import { UserEntity } from "./users/entities"
import { ReportEntity } from "./reports/entities"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [UserEntity, ReportEntity],
      synchronize: true
    }),
    UsersModule,
    ReportsModule
  ]
})
export class AppModule {}
