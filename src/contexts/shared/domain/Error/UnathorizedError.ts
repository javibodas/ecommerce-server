import HTTPError from "./HTTPError";
import HTTPStatusCode from "../HTTPStatusCode";

export default class UnathorizedError extends HTTPError {
  
    constructor(message: string) {
      super(message, HTTPStatusCode.UNATHORIZED)
    }
}