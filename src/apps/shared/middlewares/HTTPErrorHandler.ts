import { Request, Response } from "express";
import MiddlewareErrorHandlerInterface, { Handler } from "./MiddlewareErrorHandlerInterface";
import HTTPError from "contexts/shared/domain/Error/HTTPError";
import HTTPStatusCode from "contexts/shared/domain/HTTPStatusCode";

export default class HTTPErrorHandler implements MiddlewareErrorHandlerInterface {
    private handleErrorsMiddleware = (err: Error, req: Request, res: Response, next: CallableFunction) => {
        if (err instanceof HTTPError) {
            return res.status(err.getCode()).json({ message: err.getMessage() })
        }
    
        return res.status(HTTPStatusCode.INTERNAL_ERROR).json({ message: err.message });
    }

    public getHandler(): Handler<Error, Request, Response> {
        return this.handleErrorsMiddleware
    }
}