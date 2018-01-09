import {ISpecification} from "../specifications/ISpecification";
import {IImageInstagram} from "./IImageInstagram";

export class SpecSrcEndsWith implements ISpecification<IImageInstagram> {
    private substring: string;

    constructor(substring: string) {
        this.substring = substring;
    }

    public satisfiedBy(instance: IImageInstagram): boolean {
        return instance.src().endsWith(this.substring);
    }
}
