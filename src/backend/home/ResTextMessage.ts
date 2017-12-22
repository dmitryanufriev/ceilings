import * as express from "express";
import { IResponse } from "../http/IReponse";

export class ResTextMessage implements IResponse {
    public render(res: express.Response, values: any): void {
        res.write(values.message);
        res.end();
    }
}