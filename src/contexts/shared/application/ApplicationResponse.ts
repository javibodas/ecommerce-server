export class ApplicationResponse<T> {
    private data: T

    constructor(data: T){
        this.data = data
    }

    public getData(): T
    {
        return this.data
    }
}