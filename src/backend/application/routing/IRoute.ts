import { Router } from "express";

export interface IRoute {
    extend(router: Router): void;
}
