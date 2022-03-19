import User from '../../../src/contexts/mooc/users/domain/User'
import UserId from '../../../src/contexts/mooc/users/domain/UserId'
import TestUuuidHelper from '../services/TestUuuidHelper'

export default class TestUser extends User {
		
	public static LOGIN_NAME = 'testuser'
	public static PASSWORD = 'testpassword'
	public static NAME = 'testname'
	public static LAST_NAME = 'testsurname'
	public static EMAIL_ADDRESS = 'test@example.com'
	public static CREATE_DATE = '01/01/1753'
	public static COUNTRY = 'ES'
	public static CURRENCY = 'EUR'

	constructor() 
	{
		super(
			new UserId(TestUuuidHelper.UUID_TEST),
			TestUser.LOGIN_NAME,
			TestUser.PASSWORD,
			TestUser.NAME,
			TestUser.LAST_NAME,
			TestUser.EMAIL_ADDRESS,
			TestUser.COUNTRY,
			TestUser.CREATE_DATE,
			TestUser.CURRENCY
		)
	}
}
