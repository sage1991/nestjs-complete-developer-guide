import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe
} from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core"

import { SerializeInterceptor, UserMiddleware } from "./core"
import { UsersModule } from "./users"
import { UserEntity } from "./users/entities"
import { ReportsModule } from "./reports"
import { ReportEntity } from "./reports/entities"
import { AuthModule } from "./auth"

const cookieSession = require("cookie-session")

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [UserEntity, ReportEntity],
      synchronize: true
    }),
    UsersModule,
    ReportsModule,
    AuthModule
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(cookieSession({ keys: ["abc123"] }), UserMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL })
  }
}
