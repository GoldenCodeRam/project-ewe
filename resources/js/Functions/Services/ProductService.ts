import axios from "axios";
import {
    getValuesFromForm,
    type Form,
    type PaginatedResponse,
    type Product,
} from "../../Types/Types";
import {
    type FindAllAction,
    type FindOneAction,
    type PostAction,
    Service,
} from "./Service";
import { writable } from "svelte/store";
import { router } from "@inertiajs/svelte";

export function createProductService() {
    return new Service<Product>(writable(), "/api/product");
}

export function createProductsService() {
    return new Service<PaginatedResponse<Product>>(writable(), "/api/product");
}

export class ProductActions
    implements
        FindAllAction<PaginatedResponse<Product>>,
        FindOneAction<Product>,
        PostAction<Product>
{
    public async findAll(
        serviceStore: Service<PaginatedResponse<Product>>,
        params?: any[],
    ) {
        serviceStore.doWithLoading(async () => {
            const response = await axios.get<PaginatedResponse<Product>>(
                serviceStore.route,
                {
                    params,
                },
            );
            serviceStore.store.set(response.data);
        });
    }

    public async findOne(id: string, serviceStore: Service<Product>) {
        serviceStore.doWithLoading(async () => {
            const response = await axios.get<Product>(
                `${serviceStore.route}/${id}`,
            );
            serviceStore.store.set(response.data);
        });
    }

    public async post(form: Form, serviceStore: Service<Product>) {
        await router.post(
            `${serviceStore.route}/create`,
            getValuesFromForm(form),
        );
    }
}
