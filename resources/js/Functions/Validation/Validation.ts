import { z } from "zod";
import type { User, Login } from "../../Types/Types";

export interface ValidatesInput<T> {
    validate(object: Object): z.SafeParseReturnType<T, T>;
}

class UserValidator implements ValidatesInput<User> {
    public validate(object: Object): z.SafeParseReturnType<User, User> {
        return z
            .object({
                firstName: z.string({
                    required_error: "El nombre es requerido.",
                }),
                lastName: z.string({
                    required_error: "El apellido es requerido.",
                }),
                email: z
                    .string()
                    .email({ message: "El correo tiene un formato inválido." }),
            })
            .safeParse(object);
    }
}

class LoginValidator implements ValidatesInput<Login> {
    public validate(object: Object): z.SafeParseReturnType<Login, Login> {
        return z
            .object({
                email: z
                    .string({ required_error: "El correo es requerido." })
                    .email({ message: "El correo tiene un formato inválido." }),
                password: z
                    .string()
                    .min(1, { message: "Debes ingresar una contraseña." }),
            })
            .safeParse(object);
    }
}

// Exports
export const userValidator = new UserValidator();
export const loginValidator = new LoginValidator();
