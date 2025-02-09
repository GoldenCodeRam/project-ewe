import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Input, LoginForm } from "../../Types/Types";

export function useInputStore(): Writable<Input> {
    return writable<Input>({
        value: "",
    });
}

export function useLoginStore(): Writable<LoginForm> {
    return writable<LoginForm>({
        isLoading: false,
        hasError: false,
        fields: {
            email: {
                value: "",
            },
            password: {
                value: "",
            },
        },
    });
}
