import HTTPError from "./HTTPError";
import HTTPStatusCode from "../HTTPStatusCode";

export default class InternalError extends HTTPError {
  
    constructor(message: string) {
      super(message, HTTPStatusCode.INTERNAL_ERROR)
    }
}