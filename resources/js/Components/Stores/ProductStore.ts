import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { CreateProductForm as CreateProductForm } from "../../Types/Types";

export function useCreateProductStore(): Writable<CreateProductForm> {
    return writable<CreateProductForm>({
        hasError: false,
        fields: {
            name: {
                value: "",
            },
            value: {
                value: "0",
            },
        },
    });
}
