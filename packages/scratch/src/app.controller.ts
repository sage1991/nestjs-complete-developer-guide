import { Controller, Get } from "@nestjs/common"

@Controller()
export class AppController {
  @Get()
  getHandler() {
    return "hi there!"
  }
}
