import {Router} from "express";
import {IActionAsync} from "../actions/IActionAsync";
import {RouteAbstract} from "./RouteAbstract";

export class RouteGet extends RouteAbstract {
    constructor(url: string, action: IActionAsync) {
        super(url, action);
    }

    public extend(router: Router): void {
        super.get(router);
    }
}
