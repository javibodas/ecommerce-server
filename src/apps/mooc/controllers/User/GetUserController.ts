import { Request, Response, Router } from "express";
import GetUser from "contexts/mooc/users/application/GetUser";
import GetUserResponse from "contexts/mooc/users/application/GetUser/GetUserResponse";
import HTTPStatusCode from "contexts/shared/domain/HTTPStatusCode";
import ControllerInterface from "apps/shared/controllers/ControllerInterface";

export default class GetUserController implements ControllerInterface{

    private router: Router
    private getUserService: GetUser

    private PATH = '/mooc/users/:id'

    constructor(getUserService: GetUser)
    {
        this.router = Router()
        this.getUserService = getUserService
        this.initializeRoutes()
    }

    public getUserBackOffice = async (req: Request, res: Response, next: CallableFunction): Promise<Response  | undefined> => {
        const userUuid = req.params.id
    
        try {
            const response: GetUserResponse = await this.getUserService.run(userUuid)

            return res.status(HTTPStatusCode.OK).send({ data: response.getData() });
        } catch(err: any) {
            next(err);
        }
    }

    private initializeRoutes()
    {
        this.router.get(this.PATH, this.getUserBackOffice)
    }

    public getRouter(): Router
    {
        return this.router
    }
}