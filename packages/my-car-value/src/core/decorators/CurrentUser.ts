import { createParamDecorator, ExecutionContext } from "@nestjs/common"

import { User } from "../../users/models"

export const CurrentUser = createParamDecorator<never, ExecutionContext, User>(
  (_, context) => context.switchToHttp().getRequest().user
)
