import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserEntity } from "../entities"
import { CreateUserRequest, FindUserRequest, UpdateUserRequest } from "../models"

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

  create(request: CreateUserRequest) {
    return this.repository.save(this.repository.create(request))
  }

  async findOne(id: number) {
    const user = await this.repository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`Cannot find user with given id: ${id}`)
    }
    return user
  }

  findAll(request: FindUserRequest) {
    return this.repository.find({ where: request })
  }

  async update(id: number, request: UpdateUserRequest) {
    const user = await this.findOne(id)
    return this.repository.save(Object.assign(user, request))
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    return this.repository.remove(user)
  }
}
