import request from "supertest"

import app from "../../../src/app"

describe("GET /api/v1/healthcheck", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/v1/healthcheck").expect(200);
  })
})
