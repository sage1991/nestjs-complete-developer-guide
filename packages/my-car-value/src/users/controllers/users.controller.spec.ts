import { Test, TestingModule } from "@nestjs/testing"
import { NotFoundException } from "@nestjs/common"

import { UsersController } from "./users.controller"
import { UsersService } from "../services"
import { UserEntity } from "../entities"
import { CreateUserRequest, FindUserRequest, UpdateUserRequest } from "../models"

describe("UsersController", () => {
  let controller: UsersController
  const fakeUsersServiceFactory = (): Partial<UsersService> => {
    const users: UserEntity[] = [
      {
        id: 1,
        email: "harry.kane@kakaostyle.com",
        password: "12341234"
      }
    ]
    return {
      findAll(request: FindUserRequest) {
        const { email } = request ?? {}
        return Promise.resolve(users.filter((user) => (email ? user.email === email : true)))
      },
      create(request: CreateUserRequest) {
        const user = { id: users.length, ...request }
        users.push(user)
        return Promise.resolve(user)
      },
      async findOne(id: number) {
        const user = users.find((user) => user.id === id)
        if (!user) {
          return Promise.reject(new NotFoundException())
        }
        return Promise.resolve(user)
      },
      remove(id: number) {
        return Promise.resolve({ id, email: "", password: "" })
      },
      update(id: number, request: UpdateUserRequest) {
        const user = users.find((user) => user.id === id)
        if (user) {
          user.email = request.email ?? user.email
          user.password = request.password ?? user.password
        }
        return Promise.resolve(user)
      }
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useFactory: fakeUsersServiceFactory
        }
      ]
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  it("findAll returns a list of users with the given email", async () => {
    const users = await controller.findAll({ email: "harry.kane@kakaostyle.com" })
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual("harry.kane@kakaostyle.com")
  })

  it("findOne returns an user with the given id", async () => {
    const user = await controller.findOne(1)
    expect(user).toBeDefined()
    expect(user.id).toEqual(1)
  })

  it("findOne throws a NotFoundException if user with given id is not found", async () => {
    const findOne = () => controller.findOne(1000)
    await expect(findOne).rejects.toThrow(NotFoundException)
  })
})
