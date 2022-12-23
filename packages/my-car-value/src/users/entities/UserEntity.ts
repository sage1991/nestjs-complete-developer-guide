import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"

import { Serialize } from "../../core"
import { User } from "../models"
import { ReportEntity } from "../../reports/entities"

@Serialize(User)
@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[]
}
