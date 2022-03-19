import { v4 as uuidv4 } from 'uuid';

export default class UserId {
    value: string

    constructor(value: string)
    {
        this.value = value
    }

    public static generate(): UserId
    {
        return new UserId(uuidv4())
    }

    public getValue(): string
    {
        return this.value
    }
}