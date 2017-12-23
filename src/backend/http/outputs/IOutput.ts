import { Response } from "express";

export interface IOutput {
    /**
     * 
     */
    with(values: any): IOutput;

    /**
     * 
     */
    write(res: Response): void;
}