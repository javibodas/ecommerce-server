import EntityCriteria from "contexts/shared/domain/EntityCriteria";

export default class UserCriteria implements EntityCriteria {
    private id?: string
    private loginName?: string
    private password?: string
    private name?: string
    private lastName?: string
    private emailAddress?: string

    static create(): UserCriteria
    {
        return new UserCriteria()
    }

    public withId(id: string): UserCriteria
    {
        this.id = id
        return this
    }

    public withLoginName(loginName: string): UserCriteria
    {
        this.loginName = loginName
        return this
    }

    public withPassword(loginName: string): UserCriteria
    {
        this.loginName = loginName
        return this
    }

    public withEmailAddress(emailAddress: string): UserCriteria
    {
        this.emailAddress = emailAddress
        return this
    }

	public getId(): string | undefined
	{
		return this.id
	}

	public getLoginName(): string | undefined
	{
		return this.loginName
	}

	public getEmailAddress(): string | undefined
	{
		return this.emailAddress
	}

    public getCriteria(): string
    {
        let searchCriteria = ''

        if (this.id) searchCriteria = searchCriteria.concat(" AND id = '", this.id, "'")
        if (this.loginName) searchCriteria = searchCriteria.concat(" AND login_name = '", this.loginName, "'")
        if (this.emailAddress) searchCriteria = searchCriteria.concat(" AND email_address = '", this.emailAddress, "'")

        return searchCriteria
    }

}
