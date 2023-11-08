import axios from "axios";
import type { Writable } from "svelte/store";
import { z } from "zod";
import type { Login } from "../Types/Types";

const LOGIN_URL = "/login";

class Service {
    validate<T>(object: z.ZodType<T>) {
        const parse = object.safeParse()
    }
}

export const LoginService = {
    validate: (store: Writable<Login>) => {
        store.update((store) => {
            const parse = z.object({
                email: z
                    .string({ required_error: "El correo es requerido." })
                    .email({ message: "El correo tiene un formato inválido." }),
                password: z
                    .string( {required_error: "La contraseña es requerida."})
                    .min(1, { message: "La contraseña es requerida." }),
            }).safeParse({
                email: store.email.value,
                password: store.password.value,
            });

            if (!parse.success) {
                store.email.errors = parse.error.flatten().fieldErrors.email;
                store.password.errors = parse.error.flatten().fieldErrors.password;
            } else {
                store.email.errors = undefined;
                store.password.errors = undefined;
            }

            return store;
        });
        return LoginService;
    },
    post: (store: Login) => {
        axios.post(LOGIN_URL, );
    },
};
