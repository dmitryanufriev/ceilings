import { Application } from "./Application";
import { SettingsManual } from "./settings/SettingsManual";
import { ReqHome } from "./home/ReqHome";
import { ResTextMessage } from "./home/ResTextMessage";

export class Server {
    public start() {
        var app = new Application(
            new ReqHome(
                "/",
                new ResTextMessage()
            )
        ).run(
            new SettingsManual(8080)
        );
    }
}