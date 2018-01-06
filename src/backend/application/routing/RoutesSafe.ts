import {Application, NextFunction, Request, Response} from "express";
import {IOutput} from "../outputs/IOutput";
import {IRoutes} from "./IRoutes";

export class RoutesSafe implements IRoutes {
    private output: IOutput;
    private origin: IRoutes;

    constructor(output: IOutput, origin: IRoutes) {
        this.output = output;
        this.origin = origin;
    }

    public setUp(app: Application): void {
        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.log(err);
        });
        this.origin.setUp(app);
    }
}
