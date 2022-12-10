import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

import { Serialize } from "../../core"
import { User } from "../models"

@Serialize(User)
@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string
}
