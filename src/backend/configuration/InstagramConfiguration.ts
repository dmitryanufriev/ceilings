import * as config from "config";

export class InstagramConfiguration {
    private pathToConfigs: string;

    constructor(pathToConfigs: string) {
        this.pathToConfigs = pathToConfigs;
    }

    public accessToken(): string {
        return config.util.loadFileConfigs(this.pathToConfigs).Instagram.accessToken;
    }
}
