import winston, { Logger as WinsLogger } from "winston";
import Logger from "contexts/shared/domain/Logger";
import ecsFormat from "@elastic/ecs-winston-format";

export default class WinstonLogger implements Logger {   
    private LEVELS = {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    }

    private COLORS = {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'white',
    }

    private logger: WinsLogger;

    constructor()
    {
        winston.addColors(this.COLORS)

        this.logger = winston.createLogger({
            level: this.level(),
            levels: this.LEVELS,
            format: ecsFormat({ convertReqRes: true }),
        })
        
        this.logger.add(new winston.transports.Console())
        this.logger.add(new winston.transports.File({ filename: 'logs/all.log' }))
    }

    public error(message: string): void
    {
        this.logger.error(message)
    }

    public warn(message: string): void
    {
        this.logger.warn(message)
    }

    public info(message: string): void
    {
        this.logger.info(message)
    }

    public http(message: string): void
    {
        this.logger.info(message)
    }

    public debug(message: string): void
    {
        this.logger.debug(message)
    }

    private level(): string
    {
        const env = process.env.NODE_ENV || 'development'
        const isDevelopment = env === 'development'
        return isDevelopment ? 'debug' : 'http'
    }

    public getLogger(): WinsLogger
    {
        return this.logger;
    }

}