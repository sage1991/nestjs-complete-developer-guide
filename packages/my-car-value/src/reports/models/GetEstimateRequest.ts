import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"
import { Transform } from "class-transformer"

export class GetEstimateRequest {
  @IsString()
  @IsNotEmpty()
  maker: string

  @IsString()
  @IsNotEmpty()
  model: string

  @IsNumber()
  @Min(1900)
  @Max(9999)
  @Transform(({ value }) => parseInt(value))
  year: number

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => parseInt(value))
  mileage: number

  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  lng: number

  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  lat: number
}
