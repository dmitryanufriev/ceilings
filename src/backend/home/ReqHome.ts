import * as express from "express";
import { IRequest } from "../http/IRequest";

export class ReqHome implements IRequest {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    attach(router: express.Router): void {
        router.get('/', this.get);
    }

    private get(req: express.Request, res: express.Response) {
        res.write("Hello world");
        res.end();
    }
}