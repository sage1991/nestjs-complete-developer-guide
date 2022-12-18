import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"

import { AppModule } from "../src/app.module"

describe("AuthModule (e2e)", () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it("handles a signup request", () => {
    return request(app.getHttpServer())
      .post("/auth/signup")
      .send({ email: "harry.kane@kakaostyle.com", password: "12341234" })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            email: "harry.kane@kakaostyle.com"
          })
        )
      })
  })

  it("signup as a new user then get the currently logged in user", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ email: "harry.kane@kakaostyle.com", password: "12341234" })
      .expect(201)

    const cookie = response.get("Set-Cookie")
    const { body } = await request(app.getHttpServer())
      .get("/auth")
      .set("Cookie", cookie)
      .expect(200)

    expect(body.email).toEqual("harry.kane@kakaostyle.com")
  })
})
