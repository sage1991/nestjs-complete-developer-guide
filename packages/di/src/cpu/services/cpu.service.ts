import { Injectable } from "@nestjs/common"

import { PowerService } from "../../power/services"

@Injectable()
export class CpuService {
  constructor(private readonly powerService: PowerService) {}

  compute(a: number, b: number) {
    console.log("Drawing 10 watts of power from Power Service")
    this.powerService.supplyPower(10)
    return a + b
  }
}
