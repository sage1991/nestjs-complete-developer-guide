import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignupRequest {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
