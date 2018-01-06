import {Router} from "express";
import {IActionAsync} from "../actions/IActionAsync";
import {RouteAbstract} from "./RouteAbstract";

export class RouteNotFound extends RouteAbstract {
    constructor(action: IActionAsync) {
        super("*", action);
    }

    public extend(router: Router): void {
        super.all(router);
    }
}
