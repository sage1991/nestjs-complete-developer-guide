import { User } from "../users/models"

declare module "express" {
  import core from "express-serve-static-core"

  interface Request<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>
  > extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    user: User | null
  }
}
