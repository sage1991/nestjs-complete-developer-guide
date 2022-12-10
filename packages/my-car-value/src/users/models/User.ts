import { Expose, Exclude } from "class-transformer"

export class User {
  @Expose()
  id: number

  @Expose()
  email: string

  @Exclude()
  password: string
}
