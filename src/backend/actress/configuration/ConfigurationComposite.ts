import {IConfiguration} from "./IConfiguration";

export class ConfigurationComposite implements IConfiguration {
    private configurations: IConfiguration[];

    constructor(...configurations: IConfiguration[]) {
        this.configurations = configurations;
    }

    public has(path: string): boolean {
        return !!this.configurationWith(path);
    }

    public value(path: string): any {
        if (this.has(path)) {
            return this.configurationWith(path).value(path);
        } else {
            throw new Error(`Configuration path "${path}" is not found.`);
        }
    }

    private configurationWith(path: string): IConfiguration {
        return this.configurations.find((x) => x.has(path));
    }
}
