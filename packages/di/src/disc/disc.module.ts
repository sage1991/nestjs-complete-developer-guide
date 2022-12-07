import { Module } from "@nestjs/common"

import { PowerModule } from "../power/power.module"
import { DiscService } from "./services"

@Module({
  imports: [PowerModule],
  providers: [DiscService],
  exports: [DiscService]
})
export class DiscModule {}
