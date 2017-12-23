import { Request, Response, Router } from "express";
import { IRequest } from "../requests/IRequest";
import { IRoute } from "./IRoute";

export class RouteGet implements IRoute {
    private url: string;
    private request: IRequest;

    constructor(url: string, request: IRequest) {
        this.url = url;
        this.request = request;
    }

    public extend(router: Router) {
        const request = this.request;
        router
            .route(this.url)
            .get((req: Request, res: Response) => request.output(req).write(res));
    }
}
