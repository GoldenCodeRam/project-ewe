import { z } from "zod";
import type { User } from "../../Types/Types";

export interface ValidatesInput<T> {
    validate(object: Object): z.SafeParseReturnType<T, T>;
}

export class UserValidator implements ValidatesInput<User> {
    validate(object: Object): z.SafeParseReturnType<User, User> {
        return z
            .object({
                firstName: z
                    .string({
                        required_error: "El nombre es requerido.",
                        invalid_type_error: "El tipo de nombre es inválido.",
                    })
                    .min(5, {
                        message: "El nombre debe tener mínimo 5 caracteres.",
                    }),
                email: z
                    .string()
                    .email({ message: "El correo tiene un formato inválido." }),
            })
            .safeParse(object);
    }
}
