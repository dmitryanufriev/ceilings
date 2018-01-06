import {Application, Router} from "express";
import {IRoute} from "./IRoute";
import {IRoutes} from "./IRoutes";

export class Routes implements IRoutes {
    private routes: IRoute[];

    constructor(...routes: IRoute[]) {
        this.routes = routes;
    }

    public setUp(app: Application) {
        const router = Router();
        for (const route of this.routes) {
            route.extend(router);
        }
        app.use(router);
    }
}
