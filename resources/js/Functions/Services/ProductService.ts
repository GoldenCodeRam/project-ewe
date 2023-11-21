import { type PaginatedResponse, type Product } from "../../Types/Types";
import { Service, PaginationService } from "./Service";
import { writable } from "svelte/store";

export function createProductService() {
    const service = new Service<PaginatedResponse<Product>>(
        "/api/product",
        writable({
            current_page: 0,
            per_page: 0,
            total: 0,
            data: [],
        }),
        2000
    );

    const paginationService = new PaginationService(service);

    return {
        service,
        paginationService,
    };
}
