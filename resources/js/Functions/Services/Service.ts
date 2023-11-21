import type { ColumnSort } from "@tanstack/svelte-table";
import axios from "axios";
import { type Writable, writable, get } from "svelte/store";
import {
    getValuesFromForm,
    type Form,
    type PaginatedResponse,
    type Response,
} from "../../Types/Types";
import { router } from "@inertiajs/svelte";

export class PaginationService<
    T extends PaginatedResponse = PaginatedResponse,
> {
    constructor(private service: Service<T>) {}

    public getServiceStore() {
        return this.service.store;
    }

    public async getNextPage() {
        await this.service.doWithLoading(async () => {
            const response = await axios.get<T>(this.service.baseUrl, {
                params: {
                    page: get(this.service.store).current_page + 1,
                },
            });

            this.service.store.set(response.data);
        });
    }

    public async getPreviousPage() {
        await this.service.doWithLoading(async () => {
            const response = await axios.get<T>(this.service.baseUrl, {
                params: {
                    page: get(this.service.store).current_page - 1,
                },
            });

            this.service.store.set(response.data);
        });
    }

    public async getStartPage() {
        await this.service.doWithLoading(async () => {
            const response = await axios.get<T>(this.service.baseUrl, {
                params: {
                    page: 1,
                },
            });

            this.service.store.set(response.data);
        });
    }

    public async getEndPage() {
        await this.service.doWithLoading(async () => {
            const paginationData = get(this.service.store);
            const response = await axios.get<T>(this.service.baseUrl, {
                params: {
                    page: Math.ceil(paginationData.total / paginationData.per_page),
                },
            });

            this.service.store.set(response.data);
        });
    }

    public async getPage(page: number, options?: { sort?: ColumnSort[] }) {
        await this.service.doWithLoading(async () => {
            const response = await axios.get<T>(this.service.baseUrl, {
                params: {
                    page,
                    ...options,
                },
            });

            // TODO: Handle when the response is not correct.
            this.service.store.set(response.data);
        });
    }
}

export class Service<T extends Response> {
    public sortingStore: Writable<{ sort: ColumnSort[] }> = writable({
        sort: [],
    });
    public loadingStore: Writable<{ isLoading: boolean }> = writable({
        isLoading: false,
    });

    constructor(
        public baseUrl: string,
        public store: Writable<T>,
        // Optional parameters
        public timeout: number = 0,
    ) {}

    public async get() {
        await this.doWithLoading(async () => {
            const response = await axios.get<T>(this.baseUrl, {
                params: {
                    sort: get(this.sortingStore).sort,
                },
            });
            this.store.set(response.data);
        });
    }

    public async post(form: Form) {
        await router.post(`${this.baseUrl}/create`, getValuesFromForm(form));
    }

    public async patch() {}

    public async delete() {}

    public async doWithLoading(callback: () => Promise<void>) {
        // If the request has not been done yet.
        if (get(this.loadingStore).isLoading) {
            return;
        }

        this.loadingStore.set({ isLoading: true });

        await this.wait();
        await callback();

        this.loadingStore.set({ isLoading: false });
    }

    private async wait() {
        if (this.timeout > 0) {
            await new Promise<void>((resolve) =>
                setTimeout(() => resolve(), this.timeout),
            );
        }
    }
}
