import { Application } from "./Application";
import { SettingsManual } from "./settings/SettingsManual";
import { ReqHome } from "./home/ReqHome";

export class Server {
    public start() {
        var app = new Application(
            new ReqHome(
                "/"
            )
        ).run(
            new SettingsManual(8080)
        );
    }
}