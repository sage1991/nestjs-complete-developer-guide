import { Module } from "@nestjs/common"

import { UsersModule } from "../users"
import { AuthController } from "./controllers"
import { AuthService } from "./services"

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
