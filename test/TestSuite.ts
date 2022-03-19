import Application from '../src/Application'
import WebTokenGenerator from '../src/apps/shared/auth/WebTokenGenerator'
import TestContainer from './mocks/services/TestContainer'
import TestUserRepository from './mocks/services/TestUserRepository'
import request, {Response} from 'supertest'

export default class TestSuite {
	private static container = new TestContainer()
	private static application = new Application(TestSuite.container, 3000)

	// Mock Services
	public static userRepositoryMock: TestUserRepository = <TestUserRepository> TestSuite.container.getService('service.mooc.postgreUserRepo')

	public static async asyncGetRequest(url: string, status: number): Promise<Response>
	{
		return await request(TestSuite.application.getApp())
		.get(url)
		.expect(status)
	}

	public static async asyncAuthorizedGetRequest(url: string, status: number, token: string): Promise<Response>
	{
		return await request(TestSuite.application.getApp())
		.get(url)
		.set('Authorization', token)
		.expect(status)	
	}

	public static async asyncPostRequest(url: string, payload: string | Record<string, unknown> | undefined, status: number): Promise<Response>
	{

		return await request(TestSuite.application.getApp())
		.post(url)
		.send(payload || {})
		.expect(status)
	}

	public static async authorizeUser(uuid: string): Promise<string>
	{
		return await WebTokenGenerator.generate(uuid)
	}
}
