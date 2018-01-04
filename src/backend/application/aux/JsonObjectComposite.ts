export class JsonObjectComposite {
    private source: any[];

    constructor(source: any[]) {
        this.source = source;
    }

    public merge(): any {
        return this.source.reduce(
            (target: any, current: any) => {
                return {...target, ...current};
            }, {}
        );
    }
}
