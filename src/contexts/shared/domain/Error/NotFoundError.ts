import HTTPError from "./HTTPError";
import HTTPStatusCode from "../HTTPStatusCode";

export default class NotFoundError extends HTTPError {
  
    constructor(message: string) {
      super(message, HTTPStatusCode.NOT_FOUND)
    }
}