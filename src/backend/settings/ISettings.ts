import * as express from "express";

export interface ISettings {
    setUp(app: express.Application): void;
}
