import * as config from "config";
import { IConfiguration } from "./IConfiguration";

export class ConfigurationRoot implements IConfiguration {
    public value(path: string): any {
        return config.get(path);
    }
}
