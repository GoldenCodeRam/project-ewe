import axios from "axios";
import type { PaginatedResponse, ProductCategory } from "../../Types/Types";
import { Service, type FindAllAction } from "./Service";
import { writable } from "svelte/store";

export function createProductCategoryService() {
    return new Service<PaginatedResponse<ProductCategory>>(
        writable({
            data: [],
            current_page: 0,
            per_page: 0,
            total: 0,
        }),
        "/api/product-category",
    );
}

export class ProductCategoryActions
    implements FindAllAction<PaginatedResponse<ProductCategory>>
{
    public async findAll(
        serviceStore: Service<PaginatedResponse<ProductCategory>>,
    ) {
        serviceStore.doWithLoading(async () => {
            const response = await axios.get<
                PaginatedResponse<ProductCategory>
            >(serviceStore.route);
            serviceStore.store.set(response.data);
        });
    }
}
