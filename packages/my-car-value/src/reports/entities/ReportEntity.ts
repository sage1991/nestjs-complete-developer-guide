import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { UserEntity } from "../../users/entities"
import { Serialize } from "../../core"
import { Report } from "../models"

@Serialize(Report)
@Entity({ name: "report" })
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  price: number

  @Column()
  maker: string

  @Column()
  model: string

  @Column()
  year: number

  @Column()
  lng: number

  @Column()
  lat: number

  @Column()
  mileage: number

  @Column({ default: false })
  approved: boolean

  @ManyToOne(() => UserEntity, (user) => user.reports)
  @JoinColumn({ name: "user_id" })
  user: UserEntity
}
