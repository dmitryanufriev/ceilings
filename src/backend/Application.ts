import * as http from "http";
import * as express from "express";

import { ISettings } from "./settings/ISettings";
import { IRequest } from "./http/IRequest";

export class Application {
    private app: express.Application;
    private requests: IRequest[];

    constructor(...requests: IRequest[]) {
        this.app = express();
        this.requests = requests;
    }

    public run(settings: ISettings) {
        for (let request of this.requests) {
            request.attach(this.app);
        }
        http.createServer(this.app)
            .listen(settings.port())
            .on(
                "listening",
                () => console.log(`Listen on port ${settings.port()}...`)
            );
    }

    private onListeningIncomingRequests() {
        console.log("Listen app...");
    }
}