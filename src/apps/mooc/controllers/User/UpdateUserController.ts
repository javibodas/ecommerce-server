import { Request, Response, Router } from "express";
import HTTPStatusCode from "contexts/shared/domain/HTTPStatusCode";
import ControllerInterface from "apps/shared/controllers/ControllerInterface";
import UpdateUser from "contexts/mooc/users/application/UpdateUser";
import UpdateUserResponse from "contexts/mooc/users/application/UpdateUser/UpdateUserResponse";

export default class UpdateUserController implements ControllerInterface {

    private router: Router
    private updateUserService: UpdateUser

    private PATH = '/mooc/users/:id'

    constructor(updateUserService: UpdateUser)
    {
        this.router = Router()
        this.updateUserService = updateUserService
        this.initializeRoutes()
    }

    public updateUserBackOffice = async (req: Request, res: Response, next: CallableFunction): Promise<Response  | undefined> => {
        const userUuid = req.params.id

        try {
            const response: UpdateUserResponse = await this.updateUserService.run(userUuid, req.body.name, req.body.lastName, req.body.loginName, req.body.password, req.body.emailAddress)

            return res.status(HTTPStatusCode.OK).send({ data: response.getData() })
        } catch (err: any) {
            next(err)
        }
    }

    private initializeRoutes()
    {
        this.router.put(this.PATH, this.updateUserBackOffice)
    }

    public getRouter(): Router
    {
        return this.router
    }
}
