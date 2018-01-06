import {NextFunction, Request, Response, Router} from "express";
import {IActionAsync} from "../actions/IActionAsync";
import {IRoute} from "./IRoute";

export abstract class RouteAbstract implements IRoute {
    private url: string;
    private action: IActionAsync;

    constructor(url: string, action: IActionAsync) {
        this.url = url;
        this.action = action;
    }

    public abstract extend(router: Router): void;

    protected all(router: Router): void {
        router.all(this.url, this.writeOut());
    }

    protected get(router: Router): void {
        router.get(this.url, this.writeOut());
    }

    protected post(router: Router): void {
        router.post(this.url, this.writeOut());
    }

    private writeOut() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const out = await this.action.output(req);
                out.write(res);
            } catch (e) {
                next(e);
            }
        };
    }
}
