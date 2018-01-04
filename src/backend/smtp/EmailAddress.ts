export class EmailAddress {
    private email: string;
    private name: string;

    constructor(email: string, name?: string) {
        this.email = email;
        this.name = name;
    }

    public toString(): string {
        return this.name
            ? `${this.name} <${this.email}>`
            : this.email;
    }
}
