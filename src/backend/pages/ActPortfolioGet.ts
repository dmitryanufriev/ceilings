import * as e from "express";
import {IActionAsync} from "../application/actions/IActionAsync";
import {IOutput} from "../application/outputs/IOutput";
import {IConfiguration} from "../configuration/IConfiguration";

export class ActPortfolioGet implements IActionAsync {
    private contacts: IConfiguration;
    private out: IOutput;

    constructor(contacts: IConfiguration, output: IOutput) {
        this.contacts = contacts;
        this.out = output;
    }

    public output(req: e.Request): Promise<IOutput> {
        return Promise.resolve(
            this.out.with({
                title: "Натяжные потолки от Жени",
                description: `тел.: ${this.contacts.value("phone")}`,
                image: `${req.params.name}.${req.params.ext}`
            })
        );
    }
}
