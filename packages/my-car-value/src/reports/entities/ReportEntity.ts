import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "report" })
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  price: number
}
