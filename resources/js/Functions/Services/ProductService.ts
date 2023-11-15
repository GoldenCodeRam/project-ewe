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

export class ProductService extends Service {
    public async post(form: CreateProductForm) {
        await this.wait();
        await router.post(`${BASE_URL}/create`, getValuesFromForm(form));
    }

    public async get(options?: { sort?: ColumnSort[] }) {
        await this.wait();
        return await axios.get<PaginatedResponse<Product>>(`${BASE_URL}`, {
            params: options,
        });
    }
}
