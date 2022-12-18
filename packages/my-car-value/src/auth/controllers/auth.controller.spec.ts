import { Test, TestingModule } from "@nestjs/testing"

import { AuthController } from "./auth.controller"
import { AuthService } from "../services"
import { SigninRequest, SignupRequest } from "../models"
import { UserEntity } from "../../users/entities"

describe("AuthController", () => {
  let controller: AuthController
  const fakeAuthServiceFactory = (): Partial<AuthService> => ({
    async signup({ email, password }: SignupRequest): Promise<UserEntity> {
      return Promise.resolve({
        id: Date.now(),
        email,
        password
      })
    },
    async signin({ email, password }: SigninRequest): Promise<UserEntity> {
      return Promise.resolve({
        id: Date.now(),
        email,
        password
      })
    }
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: fakeAuthServiceFactory
        }
      ]
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  it("signup updates session and returns user", async () => {
    const session = {}
    const user = await controller.signup(
      { email: "harry.kane@kakaostyle.com", password: "12341234" },
      session
    )
    expect(user).toBeDefined()
    expect(session).toEqual(expect.objectContaining({ userId: user.id }))
  })

  it("signin updates session and returns user", async () => {
    const session = {}
    const user = await controller.signin(
      { email: "harry.kane@kakaostyle.com", password: "12341234" },
      session
    )
    expect(user).toBeDefined()
    expect(session).toEqual(expect.objectContaining({ userId: user.id }))
  })

  it("signout updates userId in session to null", async () => {
    const session = { userId: Date.now() }
    await controller.signout(session)
    expect(session).toEqual(expect.objectContaining({ userId: null }))
  })
})
