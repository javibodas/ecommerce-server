import express from "express";
import path from "path";
import { Definition } from "node-dependency-injection";  
import HTTPErrorHandler from "apps/shared/middlewares/HTTPErrorHandler";
import AuthorizationHandler from "apps/shared/middlewares/AuthorizationHandler";
import MorganHandler from "apps/shared/middlewares/MorganHandler";
import Container from "Container";
import ControllerInterface from "apps/shared/controllers/ControllerInterface";
import cors from "cors"

export default class Application
{
    private app: express.Application
    private port: number
    private container: Container

    constructor(container: Container, port: number)
    {
        this.app = express()
        this.port = port
        this.container = container

        this.initializeAppConfig()
        this.initializePublicRoutes()
        this.initializeAuthorizationMiddleware()
        this.initializePrivateRoutes()
        this.initializeMiddlewareAfterControllers()
	}

    private initializeAppConfig(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(
            express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
        )
        this.app.use(cors())

        const morganHandler: MorganHandler = this.container.getService('morganHandler')
        this.app.use(morganHandler.getHandler())
    }

    private initializePublicRoutes(): void {
        const controllers: Map<string, Definition> = this.container.findServicesByTag('public-controller')
		this.initializeControllers(controllers)
    }

    private initializeAuthorizationMiddleware(): void {
        const authorizationHandler: AuthorizationHandler = this.container.getService('authorizationHandler')
        this.app.use(authorizationHandler.getHandler())
    }

    private initializePrivateRoutes(): void {
        const controllers: Map<string, Definition> = this.container.findServicesByTag('private-controller')
        this.initializeControllers(controllers)
    }

    private initializeMiddlewareAfterControllers(): void {
        const httpErrorHandler: HTTPErrorHandler = this.container.getService('httpErrorHanlder')
        this.app.use(httpErrorHandler.getHandler())
    }

    private initializeControllers(controllers: Map<string, Definition>) {
		controllers.forEach((value: Definition, key: string) => {
            const controller: ControllerInterface = this.container.getService(key)
            this.app.use('' + process.env.API_PATH_ROUTE, controller.getRouter());
        });
    }

    public listen(): void {
        const port = this.port

        this.app.listen(port, function ()
        {
            console.log(`App is running at http://localhost:${port}`);
        })
    }

    public getApp(): express.Application {
        return this.app
    }
}
