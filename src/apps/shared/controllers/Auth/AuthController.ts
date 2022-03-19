import { Request, Response, Router } from "express";
import ControllerInterface from "apps/shared/controllers/ControllerInterface";
import WebTokenGenerator from 'apps/shared/auth/WebTokenGenerator';
import UnathorizedError from "contexts/shared/domain/Error/UnathorizedError";
import GetUserByCriteria from "contexts/mooc/users/application/GetUserByCriteria";
import GetUserResponse from "contexts/mooc/users/application/GetUser/GetUserResponse";
import UserCriteria from "contexts/mooc/users/domain/UserCriteria";
import User from "contexts/mooc/users/domain/User";
import PasswordEncryptor from "contexts/shared/domain/Encryptor/PasswordEncryptor";
import Logger from "contexts/shared/domain/Logger";

export default class AuthController implements ControllerInterface {
    private router: Router
    private getUserService: GetUserByCriteria
    private logger: Logger

    private PATH = '/auth'

    constructor(getUserService: GetUserByCriteria, logger: Logger)
    {
        this.router = Router()
        this.getUserService = getUserService
        this.logger = logger
        this.initializeRoutes()
    }

    public authorize = async (req: Request, res: Response, next: CallableFunction): Promise<Response  | undefined> => {

        const username = req.body.username
        const password = req.body.password

        try {

            this.checkRequiredBodyParams(username, password)

            const user: User = await this.checkAuthorizedUser(username, password)

            const token: string = WebTokenGenerator.generate(user.getId())

            this.logger.info("User " + user.getLoginName + " logged in")

            return res.status(200).send({token});

        } catch (error: any) {
            next(error)
        }
    }

    private checkRequiredBodyParams(username: string, password: string): void {
        if ((!username || username === '') || (!password || password === '')) {
            this.logger.info(username + " " + password)
            throw new UnathorizedError('Faltan los parametros "username" o "password"')
        }
    }

    private async checkAuthorizedUser(username: string, password: string): Promise<User> {
        const criteria: UserCriteria = UserCriteria.create().withLoginName(username)

        try {
            const response: GetUserResponse = await this.getUserService.run(criteria)
            const user: User = response.getData()

            if (!await this.isPasswordSameAsUserHashedPassword(password, user.getPassword())) {
                throw new UnathorizedError('Password incorrect')
            }

            return user
        } catch (error: any) {
            if (error instanceof UnathorizedError) {
                throw error
            }

            this.logger.error("Authorize user " + username + ": " + error.stack)

            throw new UnathorizedError('User not founded')
        }
    }

    private async isPasswordSameAsUserHashedPassword(password: string, userHashedPassword: string): Promise<boolean> {
        return await PasswordEncryptor.compare(password, userHashedPassword)
    }

    private initializeRoutes(): void
    {
        this.router.post(this.PATH, this.authorize)
    }

    public getRouter(): Router
    {
        return this.router
    }
}
