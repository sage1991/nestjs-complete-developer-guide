import { IsEmail, IsOptional } from "class-validator"

export class FindUserRequest {
  @IsEmail()
  @IsOptional()
  email: string
}
