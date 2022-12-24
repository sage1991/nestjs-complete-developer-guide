import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Request } from "express"

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { user }: Request = context.switchToHttp().getRequest()
    return !!user
  }
}
