import { IValuePath } from "./IValuePath";

export interface IConfiguration {
    value(path: IValuePath, defaultValue: string): string;
}
