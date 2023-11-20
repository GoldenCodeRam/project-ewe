import type { ColumnSort } from "@tanstack/svelte-table";
import {
    getValuesFromForm,
    type CreateProductForm,
    type PaginatedResponse,
    type Product,
} from "../../Types/Types";
import {
    createLoadingStore,
    type HasLoadingStore,
    type HasPagination,
    type HasSortingStore,
    type Service,
} from "./Service";
import { writable, get } from "svelte/store";
import axios from "axios";
import { router } from "@inertiajs/svelte";

const BASE_URL = "/api/product";

export type ProductService = Service<PaginatedResponse<Product>> &
    HasPagination &
    HasLoadingStore &
    HasSortingStore & {
        get: () => Promise<void>;
        post(form: CreateProductForm): Promise<void>;
    };

export function createProductService(): ProductService {
    return {
        store: writable({
            current_page: 0,
            per_page: 0,
            total: 0,
            data: [],
        }),
        sortingStore: writable({
            sort: [],
        }),
        ...createLoadingStore(3000),
        getNextPage() {},
        getPreviousPage() {},
        getStartPage() {},
        getEndPage() {},
        async getPage(page: number, options?: { sort?: ColumnSort[] }) {
            this.doWithLoading(async () => {
                const response = await axios.get<PaginatedResponse<Product>>(
                    BASE_URL,
                    {
                        params: {
                            page,
                            ...options,
                        },
                    },
                );

                // TODO: Handle when the response is not correct.
                this.store.set(response.data);
            });
        },
        async get() {
            return this.doWithLoading(async () => {
                const response = await axios.get<PaginatedResponse<Product>>(
                    BASE_URL,
                    {
                        params: get(this.sortingStore),
                    },
                );

                // TODO: Handle when the response is not correct.
                this.store.set(response.data);
            });
        },
        async post(form: CreateProductForm) {
            await this.doWithLoading(async () => {
                await router.post(
                    `${BASE_URL}/create`,
                    getValuesFromForm(form),
                );
            });
        },
    };
}
