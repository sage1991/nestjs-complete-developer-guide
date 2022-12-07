import { Module } from "@nestjs/common"

import { ComputerModule } from "./computer/computer.module"

@Module({
  imports: [ComputerModule]
})
export class AppModule {}
