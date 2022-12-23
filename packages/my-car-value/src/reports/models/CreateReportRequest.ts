import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

export class CreateReportRequest {
  @IsNumber()
  @Min(0)
  price: number

  @IsString()
  @IsNotEmpty()
  maker: string

  @IsString()
  @IsNotEmpty()
  model: string

  @IsNumber()
  @Min(1900)
  @Max(9999)
  year: number

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number

  @IsLongitude()
  lng: number

  @IsLatitude()
  lat: number
}
