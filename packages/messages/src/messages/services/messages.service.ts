import { Injectable, NotFoundException } from "@nestjs/common"

import { MessagesRepository } from "../repositories"
import { CreateMessageRequest } from "../models"

@Injectable()
export class MessagesService {
  constructor(private repository: MessagesRepository) {}

  async findOne(id: string) {
    const message = await this.repository.findOne(id)
    if (!message) {
      throw new NotFoundException(`Cannot find message for given id: ${id}`)
    }
    return message
  }

  findAll() {
    return this.repository.findAll()
  }

  create(request: CreateMessageRequest) {
    return this.repository.create(request.content)
  }
}
