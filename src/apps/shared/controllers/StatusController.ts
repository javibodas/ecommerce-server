import { Request, Response, Router } from "express";
import ControllerInterface from "./ControllerInterface";

export default class HealthCheck implements ControllerInterface {
    
    private router: Router
    
    private PATH = '/healthcheck'


    constructor()
    {
        this.router = Router()
        this.initializeRoutes()
    }

    public healthCheck = async (req: Request, res: Response): Promise<Response  | undefined> => {
        return res.status(200).send();
    }

    private initializeRoutes(): void
    {
        this.router.get(this.PATH, this.healthCheck)
    }

    public getRouter(): Router
    {
        return this.router
    }
}