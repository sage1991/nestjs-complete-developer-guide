import { Module } from "@nestjs/common"

import { PowerService } from "./services"

@Module({
  providers: [PowerService],
  exports: [PowerService]
})
export class PowerModule {}
