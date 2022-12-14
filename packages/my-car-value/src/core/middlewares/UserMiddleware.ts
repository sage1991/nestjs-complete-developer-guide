import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response } from "express"
import { plainToInstance } from "class-transformer"

import { UsersService } from "../../users/services"
import { User } from "../../users/models"

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly service: UsersService) {}

  async use(req: Request, res: Response, next: (error?: any) => void) {
    let user: User | null = null
    const { userId } = req.session ?? {}
    if (userId) {
      const entity = await this.service.findOne(userId).catch(() => null)
      user = entity ? plainToInstance(User, entity) : null
    }
    req.user = user
    next()
  }
}
