import TestSuite from '../../../TestSuite'
import TestUuuidHelper from '../../../mocks/services/TestUuuidHelper'
import TestUser from '../../../mocks/domain/TestUser'

describe('POST /api/v1/mooc/users', () => {

	beforeEach(() => {
		TestSuite.userRepositoryMock.users = []
	})

	it('should return 200 OK and id generated when non-existing user', async () => {
		const response = await TestSuite.asyncPostRequest(
			'/api/v1/mooc/users', 
			{	
				name: TestUser.NAME, 
				lastName: TestUser.LAST_NAME, 
				loginName: TestUser.LOGIN_NAME,
				password: TestUser.PASSWORD,
				emailAddress: TestUser.EMAIL_ADDRESS,
				country: TestUser.COUNTRY
			},
			200
		)

		expect(response.body.data.value).toEqual(TestUuuidHelper.UUID_TEST)
	})

	it('should return 403 when already existing login name', async () => {
		TestSuite.userRepositoryMock.users.push(new TestUser())

		await TestSuite.asyncPostRequest(
			'/api/v1/mooc/users',
			{
				name: 'Example',
				lastName: 'ExampleSurname',
				loginName: TestUser.LOGIN_NAME,
				password: '12345678',
				emailAddress: 'example@example.com',
				country: 'US'
			}, 
			403
		)	
	})

	it('should return 403 when already existing email user', async () => {
		TestSuite.userRepositoryMock.users.push(new TestUser())
		
		await TestSuite.asyncPostRequest(
			'/api/v1/mooc/users',
			{
				name: 'Example',
				lastName: 'ExampleSurname',
				loginName: 'newLoginName',
				password: '12345678',
				emailAddress: TestUser.EMAIL_ADDRESS,
				country: 'US'
			}, 
			403
		)
	})
})
