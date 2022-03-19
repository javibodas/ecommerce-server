import { Logger as WinsLogger } from "winston";

export default interface Logger {
    error(message: string): void
    warn(message: string): void
    info(message: string): void
    http(message: string): void
    debug(message: string): void
    getLogger(): WinsLogger
}