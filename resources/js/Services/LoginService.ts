import axios from "axios";
import type { Writable } from "svelte/store";
import { z } from "zod";
import {
    getValuesFromForm,
    type Form,
    type Input,
    type LoginForm,
} from "../Types/Types";

const LOGIN_URL = "/login";

export interface HasLogin {
    post<T>(data: T): void;
}

export abstract class Service<T extends Form> {
    constructor(private store: Writable<T>) {}

    public validate() {
        this.store.update((store) => {
            const parse = z
                .object(this.getValidationObject())
                .safeParse(getValuesFromForm(store));

            // Remove the store errors before validation.
            for (const key of Object.keys(store.fields)) {
                store.fields[key as keyof typeof store.fields].errors =
                    undefined;
            }

            if (!parse.success) {
                const errors = parse.error.flatten().fieldErrors;

                for (const key of Object.keys(errors)) {
                    // If the store has the same field as the parsing error field.
                    if (store.fields[key as keyof typeof store.fields]) {
                        store.fields[key as keyof typeof store.fields].errors =
                            errors[key as keyof typeof errors];
                    }
                }
            }
            return store;
        });
    }

    /**
     * Generate a validation object so the validate method can validate the
     * store fields.
     *
     * TODO: This method has a huge problem, and that is that if the validation
     * object has other field that the store does not has, the validation fails,
     * and there is no warning. Fix this.
     */
    public abstract getValidationObject(): z.ZodRawShape;
}

export class LoginService extends Service<LoginForm> {
    public getValidationObject(): z.ZodRawShape {
        return {
            email: z
                .string({ required_error: "El correo es requerido." })
                .email({
                    message: "El correo tiene un formato inválido.",
                }),
            password: z
                .string({
                    required_error: "La contraseña es requerida.",
                })
                .min(1, { message: "La contraseña es requerida." }),
        };
    }
}
