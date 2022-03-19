import TestSuite from '../../TestSuite'

describe("GET /api/v1/healthcheck", () => {

  it("should return 200 OK", async () => {
	  await TestSuite.asyncGetRequest(
	   '/api/v1/healthcheck',
       200
	  )
	}) 
})
