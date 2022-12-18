import { Test, TestingModule } from "@nestjs/testing"
import { BadRequestException, NotFoundException } from "@nestjs/common"

import { AuthService } from "./auth.service"
import { UsersService } from "../../users/services"
import { CreateUserRequest, FindUserRequest, UpdateUserRequest } from "../../users/models"
import { UserEntity } from "../../users/entities"

describe("AuthService", () => {
  let service: AuthService
  const fakeUsersServiceFactory = (): Partial<UsersService> => {
    const users: UserEntity[] = []
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
      findOne(id: number) {
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
      providers: [
        AuthService,
        {
          provide: UsersService,
          useFactory: fakeUsersServiceFactory
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  it("creates a new user with salted and hashed password", async () => {
    const user = await service.signup({
      email: "harry.kane@kakaostyle.com",
      password: "12341234"
    })
    const { password } = user
    const [salt, hash] = password.split(".")
    expect(password).not.toEqual("12341234")
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it("throws an BadRequestException if user signs up with email in use", async () => {
    await service.signup({
      email: "harry.kane@kakaostyle.com",
      password: "12341234"
    })
    const signup = () =>
      service.signup({
        email: "harry.kane@kakaostyle.com",
        password: "12341234"
      })
    await expect(signup).rejects.toThrow(BadRequestException)
  })

  it("throws an NotFoundException if signin is called with an unused email", async () => {
    const signin = () =>
      service.signin({
        email: "harry.kane@kakaostyle.com",
        password: "12341234"
      })
    await expect(signin).rejects.toThrow(NotFoundException)
  })

  it("throws an BadRequestException if invalid password is provided", async () => {
    await service.signup({
      email: "harry.kane@kakaostyle.com",
      password: "12341234"
    })

    const signin = () =>
      service.signin({
        email: "harry.kane@kakaostyle.com",
        password: "123"
      })
    await expect(signin).rejects.toThrow(BadRequestException)
  })

  it("returns a user if correct password is provided", async () => {
    await service.signup({
      email: "harry.kane@kakaostyle.com",
      password: "12341234"
    })

    const user = await service.signin({
      email: "harry.kane@kakaostyle.com",
      password: "12341234"
    })
    expect(user).toBeDefined()
  })
})
