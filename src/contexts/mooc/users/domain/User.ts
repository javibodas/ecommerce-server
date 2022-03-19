import UserId from 'contexts/mooc/users/domain/UserId';
import UserLoginDetail from './UserLoginDetail';
import UserDetail     from './UserDetail';
import { QueryResultRow } from 'pg';


export default class User {
	
	private userId: UserId
	private userLoginDetail: UserLoginDetail
	private userDetail: UserDetail

	constructor(userId: UserId, loginName: string, password: string, name: string, lastName: string, emailAddress: string, country: string, createDate?: string, currency?: string) 
	{
		this.userId = userId
		this.userLoginDetail = new UserLoginDetail(loginName, password, emailAddress, createDate)
		this.userDetail = new UserDetail(name, lastName, country, currency)
	}
	
	public getId(): string
	{
		return this.userId.getValue()
	}

	public getLoginName(): string
	{
		return this.userLoginDetail.getLoginName()
	}

	public getPassword(): string
	{
		return this.userLoginDetail.getPassword()
	}

	public getName(): string
	{
		return this.userDetail.getName()
	}

	public getLastName(): string
	{
		return this.userDetail.getLastName()
	}

	public getEmailAddress(): string
	{
		return this.userLoginDetail.getEmailAddress()
	}

	public getCountry(): string
	{
		return this.userDetail.getCountry()
	}

	public getCreateDate(): string | undefined
	{
		return this.userLoginDetail.getCreateDate()
	}

	public getCurrency(): string | undefined
	{
		return this.userDetail.getCurrency()
	}

	public static createFromDataRow(row: QueryResultRow): User
	{
		return new User(
			new UserId(row.id),
			row.login_name,
			row.password,
			row.first_name,
			row.last_name,
			row.email_address,
			row.country
		)
	}
}
