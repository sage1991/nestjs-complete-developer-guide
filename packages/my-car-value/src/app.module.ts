import { Module, ValidationPipe } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core"

import { SerializeInterceptor } from "./core"
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
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ whitelist: true })
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SerializeInterceptor
    }
  ]
})
export class AppModule {}
