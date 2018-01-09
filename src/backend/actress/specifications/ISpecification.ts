export interface ISpecification<T> {
    satisfiedBy(instance: T): boolean;
}
