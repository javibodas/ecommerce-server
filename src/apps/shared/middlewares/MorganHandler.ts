import morgan, { StreamOptions } from "morgan";
import { Request, Response } from "express";
import MiddlewareHandler, { Handler } from "./MiddlewareHandler";
import Logger from "contexts/shared/domain/Logger";

export default class MorganHandler implements MiddlewareHandler {
    
  private handler: Handler<Request, Response>

    constructor(logger: Logger) {
        const stream: StreamOptions = {
          write: (message) => logger.http(message),
        };

        const skip = () => {
          const env = process.env.NODE_ENV || "development";
          return env !== "development";
        };

        this.handler = morgan(
          ":method :url :status :res[content-length] - :response-time ms",
          { stream, skip }
        );
    }


    public getHandler(): Handler<Request, Response> {
        return this.handler
    }
}