import {IConfiguration} from "./IConfiguration";

export class ConfigurationSection implements IConfiguration {
    private origin: IConfiguration;
    private section: string;

    constructor(section: string, origin: IConfiguration) {
        this.origin = origin;
        this.section = section;
    }

    public has(path: string): boolean {
        return this.origin.has(`${this.section}.${path}`);
    }

    public value(path: string) {
        return this.origin.value(`${this.section}.${path}`);
    }

}
