export default class UserLoginDetail {
    private loginName: string
    private password: string
    private emailAddress: string
    private createDate?: string

    constructor(
        loginName: string, 
        password: string, 
        emailAddress:string, 
        createDate?: string
    ) {
        this.loginName = loginName
        this.password = password
        this.emailAddress = emailAddress
        this.createDate = createDate
    }

    public getLoginName(): string
    {
        return this.loginName
    }

    public getPassword(): string
    {
        return this.password
    }

    public getEmailAddress(): string
    {
        return this.emailAddress
    }

    public getCreateDate(): string|undefined
    {
        return this.createDate
    }
}
