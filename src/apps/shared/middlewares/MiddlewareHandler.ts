import { Request, Response } from "express";

export type Handler<Request, Response> = (req: Request, res: Response, callback: (err?: Error) => void) => void;

export default interface MiddlewareHandler {
    getHandler(): Handler<Request, Response>;
}