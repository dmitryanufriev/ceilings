import * as express from "express";

export interface IRequest {
    attach(router: express.Router): void;
}