export default class UserDetail {
    private name: string
    private lastName: string
    private country: string
    private currency?: string

    constructor(
        name: string, 
        lastName: string,
        country: string,
        currency?: string
    ) {
        this.name = name
        this.lastName = lastName
        this.country = country
        this.currency = currency
    }

    public getName(): string
    {
        return this.name
    }

    public getLastName(): string
    {
        return this.lastName
    }

    public getCountry(): string
    {
        return this.country
    }

    public getCurrency(): string|undefined
    {
        return this.currency
    }
}
