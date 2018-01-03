import * as config from "config";
import { IConfiguration } from "./IConfiguration";
import { IValuePath } from "./IValuePath";

export class ConfigurationFiles implements IConfiguration {
    private directory: string;

    constructor(directory: string) {
        this.directory = directory;
    }

    public value(path: IValuePath, defaultValue: string): string {
        let value: any = config.util.loadFileConfigs(this.directory);
        for (const part of path.parts()) {
            value = value[part];
        }
        return value;
    }
}
