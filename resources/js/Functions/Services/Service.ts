import type { ColumnSort } from "@tanstack/svelte-table";
import axios from "axios";
import { type Writable, writable, get } from "svelte/store";
import {
    type Form,
    type PaginatedResponse,
} from "../../Types/Types";

export class Service<T> {
    constructor(
        public store: Writable<T>,
        public route: string,
        public timeout: number = 0,
        private loadingStore: Writable<boolean> = writable(false),
    ) { }

    // TODO: Find an use for this, as at the moment it's not used anywhere.
    public sortingStore: Writable<{ sort: ColumnSort[] }> = writable({
        sort: [],
    });

    public getStoreStatus() {
        return get(this.loadingStore);
    }

    public async doWithLoading(callback: () => Promise<void>) {
        // If the request has not been done yet.
        if (get(this.loadingStore)) {
            return;
        }

        this.loadingStore.set(true);

        // If the wait timeout has been set, wait the determined amount.
        // TODO: We should check that this is not used on production, because
        // the wait thing is only used for testing. Maybe find another way
        // of doing this?
        await this.wait();

        await callback();

        this.loadingStore.set(false);
    }

    private async wait() {
        if (this.timeout > 0) {
            await new Promise<void>((resolve) =>
                setTimeout(() => resolve(), this.timeout),
            );
        }
    }
}

export interface FindAllAction<T extends PaginatedResponse> {
    findAll(serviceStore: Service<T>): void;
}

export interface FindOneAction<T> {
    findOne(id: string, serviceStore: Service<T>): void;
}

export interface PostAction<T> {
    post(form: Form, serviceStore: Service<T>): void;
}

export class PaginatedService<T extends PaginatedResponse> extends Service<T> {
    public async getNextPage() {
        await this.doWithLoading(async () => {
            const response = await axios.get<T>(this.route, {
                params: {
                    page: get(this.store).current_page + 1,
                },
            });

            this.store.set(response.data);
        });
    }

    public async getPreviousPage() {
        await this.doWithLoading(async () => {
            const response = await axios.get<T>(this.route, {
                params: {
                    page: get(this.store).current_page - 1,
                },
            });

            this.store.set(response.data);
        });
    }

    public async getStartPage() {
        await this.doWithLoading(async () => {
            const response = await axios.get<T>(this.route, {
                params: {
                    page: 1,
                    sort: get(this.sortingStore).sort,
                },
            });

            this.store.set(response.data);
        });
    }

    public async getEndPage() {
        await this.doWithLoading(async () => {
            const paginationData = get(this.store);
            const response = await axios.get<T>(this.route, {
                params: {
                    page: Math.ceil(paginationData.total / paginationData.per_page),
                    sort: get(this.sortingStore).sort,
                },
            });

            this.store.set(response.data);
        });
    }

    public async getPage(page: number, options?: { sort?: ColumnSort[] }) {
        await this.doWithLoading(async () => {
            const response = await axios.get<T>(this.route, {
                params: {
                    page,
                    sort: get(this.sortingStore).sort,
                    ...options,
                },
            });

            // TODO: Handle when the response is not correct.
            this.store.set(response.data);
        });
    }
}

export class PaginatedServiceStore<T extends PaginatedResponse> extends ServiceStore<T> {
}
