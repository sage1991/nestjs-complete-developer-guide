import { readFile, writeFile } from "fs/promises"
import { Injectable } from "@nestjs/common"
import { Message } from "../models/Message"

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await this.read()
    return contents.find((message) => message.id === id)
  }

  findAll() {
    return this.read()
  }

  async create(content: string) {
    const contents = await this.read()
    const message = new Message()
    message.id = `${Date.now()}`
    message.content = content
    contents.push(message)
    await this.write(contents)
    return message
  }

  private async read(): Promise<Message[]> {
    return JSON.parse(await readFile("db/messages.json", "utf-8"))
  }

  private async write(contents: Message[]) {
    await writeFile("db/messages.json", JSON.stringify(contents))
  }
}
