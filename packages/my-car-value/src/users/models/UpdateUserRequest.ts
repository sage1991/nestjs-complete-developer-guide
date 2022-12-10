import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateUserRequest {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string
}
