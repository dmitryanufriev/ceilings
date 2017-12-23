import { Application, Router } from "express";
import { IRoute } from "./IRoute";

export class Routes {
    private routes: IRoute[];

    constructor(...routes: IRoute[]) {
        this.routes = routes;
    }

    public setUp(app: Application) {
        let router = Router();
        for (let route of this.routes) {
            route.extend(router);
        }
        app.use(router);
    }
}