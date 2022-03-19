import { Request, Response, Router } from "express";
import DeleteUser from "contexts/mooc/users/application/DeleteUser";
import DeleteUserResponse from "contexts/mooc/users/application/DeleteUser/DeleteUserResponse";
import HTTPStatusCode from "contexts/shared/domain/HTTPStatusCode";
import ControllerInterface from "apps/shared/controllers/ControllerInterface";

export default class DeleteUserController implements ControllerInterface{

    private router: Router
    private deleteUserService: DeleteUser

    private PATH = '/mooc/users/:id'

    constructor(deleteUserService: DeleteUser)
    {
        this.router = Router()
        this.deleteUserService = deleteUserService
        this.initializeRoutes()
    }

    public deleteUserBackOffice = async (req: Request, res: Response, next: CallableFunction): Promise<Response  | undefined> => {
        const userUuid = req.params.id

        try {
            const response: DeleteUserResponse = await this.deleteUserService.run(userUuid)

            return res.status(HTTPStatusCode.OK).send({ data: response.getData() })
        } catch(err) {
            next(err)
        }
    }

    private initializeRoutes()
    {
        this.router.delete(this.PATH, this.deleteUserBackOffice)
    }

    public getRouter(): Router
    {
        return this.router
    }
}