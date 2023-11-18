import { router } from "@inertiajs/svelte";
import {
    getValuesFromForm,
    type CreateProductForm,
    type Product,
    type PaginatedResponse,
} from "../../Types/Types";
import { Service } from "./Service";
import axios from "axios";
import type { ColumnSort } from "@tanstack/svelte-table";

const BASE_URL = "/api/product";

export class ProductService extends Service<PaginatedResponse<Product>> {
    public async post(form: CreateProductForm) {
        await this.wait();
        await router.post(`${BASE_URL}/create`, getValuesFromForm(form));
    }

    public async get(options?: { sort?: ColumnSort[] }) {
        return this.doWithLoading(async () => {
            const response = await axios.get<PaginatedResponse<Product>>(
                BASE_URL,
                {
                    params: options,
                },
            );

            // TODO: Handle when the response is not correct.
            this.getStore().set(response.data);

            this.getLoadingStore().set({ isLoading: false });
        });
    }

    public async getPage(page: number, options?: { sort?: ColumnSort[] }) {
        return this.doWithLoading(async () => {
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
            this.getStore().set(response.data);
        });
    }
}
