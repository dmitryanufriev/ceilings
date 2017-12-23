import { Router, Request, Response } from "express";
import { IRoute } from "./IRoute";
import { IRequest } from "../requests/IRequest";

export class RouteGet implements IRoute {
    private url: string;
    private request: IRequest;

    constructor(url: string, request: IRequest) {
        this.url = url;
        this.request = request;
    }

    public extend(router: Router) {
        let request = this.request;
        router
            .route(this.url)
            .get((req: Request, res: Response) => request.output(req).write(res));
    }
}