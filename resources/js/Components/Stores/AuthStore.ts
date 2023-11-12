import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Auth } from "../../Types/Types";

export function useAuthStore(): Writable<Auth> {
    return writable<Auth>({});
}

export const GlobalAuthStore = useAuthStore();
