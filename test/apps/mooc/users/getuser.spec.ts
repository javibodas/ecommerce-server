import TestSuite from '../../../TestSuite'
import TestUuuidHelper from '../../../mocks/services/TestUuuidHelper'
import TestUser from '../../../mocks/domain/TestUser' 

describe('GET /api/v1/mooc/users/id', () => {

	beforeEach(() => {
		TestSuite.userRepositoryMock.users = []
	})

	it('should return 200 when athorized request', async () => {
		TestSuite.userRepositoryMock.users.push(new TestUser())
		const token = await TestSuite.authorizeUser(TestUuuidHelper.UUID_TEST)
	
		const response = await TestSuite.asyncAuthorizedGetRequest(
			'/api/v1/mooc/users/' + TestUuuidHelper.UUID_TEST,
			200,
			token
		)

		expect(response.body.data)
		.toEqual(
			{
				userId: {
					value: TestUuuidHelper.UUID_TEST
				},
				userDetail: {
					name: TestUser.NAME,
					lastName: TestUser.LAST_NAME,
					country: TestUser.COUNTRY,
					currency: TestUser.CURRENCY
				},
				userLoginDetail: {
					createDate: TestUser.CREATE_DATE,
					emailAddress: TestUser.EMAIL_ADDRESS,
					loginName: TestUser.LOGIN_NAME,
					password: TestUser.PASSWORD
				}
			}
		)
	})

	it('should return 401 Unathorized with request without authorization', async () => {
		TestSuite.userRepositoryMock.users.push(new TestUser())

		TestSuite.asyncGetRequest(
			'/api/v1/mooc/users/' + + TestUuuidHelper.UUID_TEST, 
			401
		)
	})
})
