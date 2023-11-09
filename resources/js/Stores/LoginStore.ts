import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Input, LoginForm } from "../Types/Types";

export function useInputStore(): Writable<Input> {
    return writable<Input>({});
}

export function useLoginStore(): Writable<LoginForm> {
    return writable<LoginForm>({
        fields: {
            email: {},
            password: {},
        },
    });
}
