import { type Category, type PaginatedResponse } from "../../Types/Types";
import { Service, PaginationService } from "./Service";
import { writable } from "svelte/store";

export function createProductCategoryService() {
    const service = new Service<PaginatedResponse<Category>>(
        "/api/product-category",
        writable({
            current_page: 0,
            per_page: 0,
            total: 0,
            data: [],
        }),
    );

    const paginationService = new PaginationService(service);

    return {
        service,
        paginationService,
    };
}
