import * as express from "express";
import { IRequest } from "./IRequest";

export class Routes {
    private requests: IRequest[];

    constructor(...requests: IRequest[]) {
        this.requests = requests;
    }

    public setUp(app: express.Application) {
        for (let request of this.requests) {
            request.attach(app);
        }
    }
}