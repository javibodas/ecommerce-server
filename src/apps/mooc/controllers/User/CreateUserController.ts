import { Request, Response, Router } from "express";
import CreateUser from "contexts/mooc/users/application/CreateUser";
import CreateUserResponse from "contexts/mooc/users/application/CreateUser/CreateUserResponse";
import HTTPStatusCode from "contexts/shared/domain/HTTPStatusCode";
import ControllerInterface from "apps/shared/controllers/ControllerInterface";

export default class CreateUserController implements ControllerInterface{

    private router: Router
    private createUserService: CreateUser

    private PATH = '/mooc/users'

    constructor(createUserService: CreateUser)
    {
        this.router = Router()
        this.createUserService = createUserService
        this.initializeRoutes()
    }

    public createUserBackOffice = async (req: Request, res: Response, next: CallableFunction): Promise<Response  | undefined> => {
        try {
            const response: CreateUserResponse = await this.createUserService.run(
                req.body.name, 
                req.body.lastName, 
                req.body.loginName, 
                req.body.password, 
                req.body.emailAddress,
                req.body.country
            )
            
            return res.status(HTTPStatusCode.OK).send({ data: response.getData() })
        } catch (err: any) {
            next(err)
        }
    }

    private initializeRoutes()
    {
        this.router.post(this.PATH, this.createUserBackOffice)
    }

    public getRouter(): Router
    {
        return this.router
    }
}