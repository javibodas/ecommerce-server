import { Request, Response } from "express";
import MiddlewareHandler, { Handler } from "./MiddlewareHandler";
import HTTPStatusCode from "contexts/shared/domain/HTTPStatusCode";
import WebTokenGenerator from "apps/shared/auth/WebTokenGenerator";
import Logger from "contexts/shared/domain/Logger";

export default class AuthorizationHandler implements MiddlewareHandler {

    private logger: Logger

    constructor(logger: Logger) {
        this.logger = logger
    }


    private handleAuthorizationMiddleware = async (req: Request, res: Response, next: CallableFunction) => {
        const token = req.headers['authorization']
    
        if (!token || token === '') {
            return res.status(HTTPStatusCode.UNATHORIZED).json({message: 'Token is not present'})
        }

        try {
            await WebTokenGenerator.validate(token)
		} catch(error: any) {
            return res.status(HTTPStatusCode.UNATHORIZED).json({message: 'Invalid token'})
        }
		
        next()
    }

    public getHandler(): Handler<Request, Response> {
        return this.handleAuthorizationMiddleware
    }
}
