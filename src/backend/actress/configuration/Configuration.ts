import {ConfigurationRoot} from "./ConfigurationRoot";
import {ConfigurationSection} from "./ConfigurationSection";
import {IConfiguration} from "./IConfiguration";

export class Configuration implements IConfiguration {
    private origin: IConfiguration;

    constructor(section?: string) {
        this.origin = section
            ? new ConfigurationSection(
                section,
                new ConfigurationRoot()
            )
            : new ConfigurationRoot();
    }

    public has(path: string): boolean {
        return this.origin.has(path);
    }

    public value(path: string): any {
        return this.origin.value(path);
    }
}
