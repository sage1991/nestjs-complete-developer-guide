import { IsBoolean } from "class-validator"

export class ApproveReportRequest {
  @IsBoolean()
  approved: boolean
}
