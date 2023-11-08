import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Input, Login } from "../Types/Types";

export function useInputStore(): Writable<Input> {
    return writable<Input>({});
}

export function useLoginStore(): Writable<Login> {
    return writable<Login>({
        email: {},
        password: {},
    });
}
