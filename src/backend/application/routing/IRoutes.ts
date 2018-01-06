import {Application} from "express";

export interface IRoutes {
    setUp(app: Application): void;
}
