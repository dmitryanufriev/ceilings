import {Request, Response, Router} from "express";
import {IActionAsync} from "../actions/IActionAsync";
import {IRoute} from "./IRoute";

export class RouteNotFound implements IRoute {
    private act: IActionAsync;

    constructor(act: IActionAsync) {
        this.act = act;
    }

    public extend(router: Router): void {
        router
            .route("*")
            .all(async (req: Request, res: Response) => {
                const out = await this.act.output(req);
                out.write(res);
            });
    }
}
