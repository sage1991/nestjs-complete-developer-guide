import { Injectable } from "@nestjs/common"

import { PowerService } from "../../power/services"

@Injectable()
export class DiscService {
  constructor(private readonly powerService: PowerService) {}

  getData() {
    console.log("Drawing 20 watts of power from Power Service")
    this.powerService.supplyPower(20)
    return "data!"
  }
}
