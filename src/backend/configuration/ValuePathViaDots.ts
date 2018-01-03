import {IValuePath} from "./IValuePath";

export class ValuePathViaDots implements IValuePath {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    public parts(): string[] {
        return this.path.split(".");
    }
}
