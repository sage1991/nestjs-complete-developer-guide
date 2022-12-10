import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserEntity } from "../entities"
import { CreateUserRequest } from "../models"

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

  create(request: CreateUserRequest) {
    return this.repository.save(this.repository.create(request))
  }
}
