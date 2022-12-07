import { IsNotEmpty, IsString } from "class-validator"

export class CreateMessageRequest {
  @IsNotEmpty()
  @IsString()
  content: string
}
