import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { randomBytes, scrypt, BinaryLike } from "crypto"
import { promisify } from "util"

import { UsersService } from "../../users/services"
import { SigninRequest, SignupRequest } from "../models"

type Script = (password: BinaryLike, salt: BinaryLike, keyLen: number) => Promise<Buffer>

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private readonly scrypt: Script = promisify(scrypt)

  private async hash(password: string, salt: string = randomBytes(16).toString("hex")) {
    const hash = await this.scrypt(password, salt, 32)
    return `${salt}.${hash.toString("hex")}`
  }

  async signup({ email, password }: SignupRequest) {
    const users = await this.usersService.findAll({ email })
    if (users.length > 0) {
      throw new BadRequestException("Email in use")
    }

    return this.usersService.create({
      email,
      password: await this.hash(password)
    })
  }

  async signin({ email, password }: SigninRequest) {
    const [user] = await this.usersService.findAll({ email })
    if (!user) {
      throw new NotFoundException("User not found")
    }

    const [salt] = user.password.split(".")
    const hash = await this.hash(password, salt)

    if (user.password !== hash) {
      throw new BadRequestException("Bad password")
    }

    return user
  }

  whoAmI(id?: number) {
    if (typeof id !== "number") {
      throw new NotFoundException("User not found")
    }
    return this.usersService.findOne(id)
  }
}
