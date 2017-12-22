import * as express from "express";
import { IRequest } from "../http/IRequest";
import { IResponse } from "../http/IReponse";

export class ReqHome implements IRequest {
    private url: string;
    private response: IResponse;

    constructor(url: string, response: IResponse) {
        this.url = url;
        this.response = response;
    }

    public attach(router: express.Router): void {
        router.get('/', this.get.bind(this));
    }

    private get(req: express.Request, res: express.Response) {
        this.response.render(res, {
            message: "Hello world"
        });
    }
}