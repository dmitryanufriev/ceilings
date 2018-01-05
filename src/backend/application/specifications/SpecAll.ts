import {ISpecification} from "./ISpecification";

export class SpecAll<T> implements ISpecification<T> {
    public satisfiedBy(instance: T): boolean {
        return true;
    }
}
