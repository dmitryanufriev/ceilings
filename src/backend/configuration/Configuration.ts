import * as config from "config";
import { IConfiguration } from "./IConfiguration";

export class Configuration implements IConfiguration {
    public value(path: string): any {
        return config.get(path);
    }
}
