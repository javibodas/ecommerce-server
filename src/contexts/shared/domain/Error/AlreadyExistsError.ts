import HTTPError from "./HTTPError";
import HTTPStatusCode from "../HTTPStatusCode";

export default class AlreadyExistsError extends HTTPError {
  
    constructor(message: string) {
      super(message, HTTPStatusCode.ALREADY_EXISTS)
    }
}