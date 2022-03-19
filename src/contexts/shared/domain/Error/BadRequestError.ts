import HTTPError from "./HTTPError";
import HTTPStatusCode from "../HTTPStatusCode";

export class BadRequestError extends HTTPError {
  
    constructor(message: string) {
      super(message, HTTPStatusCode.BAD_REQUEST)
    }
}