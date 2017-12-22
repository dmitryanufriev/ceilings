import { ISettings } from "./ISettings";

export class SettingsManual implements ISettings {
    private httpPort: number;

    constructor(port: number) {
        this.httpPort = port;
    }

    public port(): number {
        return this.httpPort;
    }
}