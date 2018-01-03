import { Request, Response, Router } from "express";
import { IActionAsync } from "../actions/IActionAsync";
import { IRoute } from "./IRoute";

export class RouteGet implements IRoute {
    private url: string;
    private request: IActionAsync;

    constructor(url: string, request: IActionAsync) {
        this.url = url;
        this.request = request;
    }

    public extend(router: Router) {
        const request = this.request;
        router
            .route(this.url)
            .get(async (req: Request, res: Response) => {
                const out = await request.output(req);
                out.write(res);
            });
    }
}
