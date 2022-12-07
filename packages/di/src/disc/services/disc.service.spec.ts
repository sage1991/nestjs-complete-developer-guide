import { Test, TestingModule } from "@nestjs/testing"

import { DiscService } from "./disc.service"

describe("DiscService", () => {
  let service: DiscService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscService]
    }).compile()

    service = module.get<DiscService>(DiscService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
