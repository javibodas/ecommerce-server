import { Request, Response } from "express";

export type Handler<Error, Request, Response> = (err: Error, req: Request, res: Response, next: CallableFunction) => void;

export default interface MiddlewareErrorHandlerInterface {
    getHandler(): Handler<Error, Request, Response>;
}