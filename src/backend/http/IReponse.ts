import * as express from "express";

export interface IResponse {
    render(res: express.Response, values: any): void;
}