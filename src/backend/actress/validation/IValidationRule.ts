export interface IValidationRule {
    valid(body: any): boolean;
}
