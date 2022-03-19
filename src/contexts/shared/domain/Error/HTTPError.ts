export default class HTTPError extends Error {
    private code: number

    constructor(message: string, code: number) {
      super(message);
      this.code = code;
    }
  
    public getCode(): number
    {
      return this.code
    }

    public getMessage(): string
    {
      return this.message
    }
  }