import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe
} from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core"
import { ConfigModule, ConfigService } from "@nestjs/config"

import { SerializeInterceptor, UserMiddleware } from "./core"
import { UsersModule } from "./users"
import { UserEntity } from "./users/entities"
import { ReportsModule } from "./reports"
import { ReportEntity } from "./reports/entities"
import { AuthModule } from "./auth"

const cookieSession = require("cookie-session")

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "sqlite",
        database: config.get("DATABASE"),
        entities: [UserEntity, ReportEntity],
        synchronize: true
      })
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
  constructor(private readonly config: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieSession({ keys: [this.config.get("COOKIE_SESSION_KEY")] }), UserMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL })
  }
}
