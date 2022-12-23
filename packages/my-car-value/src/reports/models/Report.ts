import { Expose, Type } from "class-transformer"

import { User } from "../../users/models"

export class Report {
  @Expose()
  id: number

  @Expose()
  price: number

  @Expose()
  maker: string

  @Expose()
  model: string

  @Expose()
  year: number

  @Expose()
  lng: number

  @Expose()
  lat: number

  @Expose()
  mileage: number

  @Expose()
  @Type(() => User)
  user: User
}
