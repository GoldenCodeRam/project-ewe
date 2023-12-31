import axios from "axios";
import { getValuesFromForm, type Form, type PaginatedResponse, type Product } from "../../Types/Types";
import { type FindAllAction, type FindOneAction, type PostAction, Service } from "./Service";
import { writable } from "svelte/store";
import { router } from "@inertiajs/svelte";

export function createProductStore() {
    return writable<Product>();
}

export function createProductsStore() {
    return writable<Product[]>();
}

export class ProductService
    implements
    FindAllAction<PaginatedResponse<Product[]>>,
    FindOneAction<Product>,
    PostAction<Product> {

    public async findAll(serviceStore: Service<PaginatedResponse<Product[]>>) {
        serviceStore.doWithLoading(async () => {
            const response = await axios.get<PaginatedResponse<Product[]>>(serviceStore.route);
            serviceStore.store.set(response.data);
        });
    }

    public async findOne(id: string, serviceStore: Service<Product>) {
        serviceStore.doWithLoading(async () => {
            const response = await axios.get<Product>(`${serviceStore.route}/${id}`);
            serviceStore.store.set(response.data);
        });
    }

    public async post(form: Form, serviceStore: Service<Product>) {
        await router.post(`${serviceStore.route}/create`, getValuesFromForm(form));
    }
}


