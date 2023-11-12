import { router } from "@inertiajs/svelte";
import {
    getValuesFromForm,
    type CreateProductForm,
    type Product,
} from "../../Types/Types";
import { Service } from "./Service";
import axios from "axios";

const BASE_URL = "/api/product";

export class ProductService extends Service {
    public async post(form: CreateProductForm) {
        await this.wait();
        await router.post(`${BASE_URL}/create`, getValuesFromForm(form));
    }

    public async get() {
        await this.wait();
        return await axios.get<Product[]>(`${BASE_URL}`);
    }
}
