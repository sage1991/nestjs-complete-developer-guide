import { Controller, Get } from "@nestjs/common"

import { CpuService } from "../../cpu/services"
import { DiscService } from "../../disc/services"

@Controller("computer")
export class ComputerController {
  constructor(private readonly cpuService: CpuService, private readonly discService: DiscService) {}

  @Get()
  run() {
    return [this.cpuService.compute(1, 2), this.discService.getData()]
  }
}
