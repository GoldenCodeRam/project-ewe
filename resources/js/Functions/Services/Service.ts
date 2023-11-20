import type { ColumnSort } from "@tanstack/svelte-table";
import { type Writable, writable } from "svelte/store";

export interface HasPagination {
    getNextPage(): void;
    getPreviousPage(): void;
    getStartPage(): void;
    getEndPage(): void;
    getPage(page: number, options?: { sort?: ColumnSort[] }): Promise<void>;
}

export type Service<T> = {
    store: Writable<T>;
};

export type HasLoadingStore = {
    timeout: number;
    loadingStore: Writable<{
        isLoading: boolean;
    }>;
    wait: () => Promise<void>;
    doWithLoading: (callback: () => Promise<void>) => Promise<void>;
};

export function createLoadingStore(timeout: number = 0) {
    return {
        timeout,
        loadingStore: writable({
            isLoading: false,
        }),
        async wait() {
            if (this.timeout > 0) {
                await new Promise<void>((resolve) =>
                    setTimeout(() => resolve(), this.timeout),
                );
            }
        },
        async doWithLoading(callback: () => Promise<void>) {
            this.loadingStore.set({ isLoading: true });

            await this.wait();
            await callback();

            this.loadingStore.set({ isLoading: false });
        },
    };
}

export type HasSortingStore = {
    sortingStore: Writable<{
        sort: ColumnSort[];
    }>;
};
