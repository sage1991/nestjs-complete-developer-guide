import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SigninRequest {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
