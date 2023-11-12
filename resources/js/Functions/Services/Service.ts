export class Service {
    constructor(private timeout: number = 0) {}

    public setTimeout(timeout: number) {
        this.timeout = timeout;
        return this;
    }

    protected async wait(): Promise<this> {
        if (this.timeout > 0) {
            await new Promise<void>((resolve) =>
                setTimeout(() => resolve(), this.timeout),
            );
        }
        return this;
    }
}
