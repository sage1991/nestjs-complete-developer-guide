import { Module } from "@nestjs/common"

import { CpuModule } from "../cpu/cpu.module"
import { DiscModule } from "../disc/disc.module"
import { ComputerController } from "./controllers"

@Module({
  imports: [CpuModule, DiscModule],
  controllers: [ComputerController]
})
export class ComputerModule {}
