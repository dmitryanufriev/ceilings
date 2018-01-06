export interface IConfiguration {
    has(path: string): boolean;

    value(path: string): any;
}
