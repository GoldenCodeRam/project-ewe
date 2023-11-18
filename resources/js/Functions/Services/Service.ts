import { type Writable, writable } from "svelte/store";

export class Service<T> {
    private store: Writable<T> = writable();
    private loadingStore = writable({
        isLoading: false,
    });

    constructor(private timeout: number = 0) {}

    public getStore() {
        return this.store;
    }

    public getLoadingStore() {
        return this.loadingStore;
    }

    public setTimeout(timeout: number) {
        this.timeout = timeout;
        return this;
    }

    public async doWithLoading(callback: () => Promise<void>) {
        this.loadingStore.set({ isLoading: true });

        await this.wait();
        await callback();

        this.loadingStore.set({ isLoading: false });
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
