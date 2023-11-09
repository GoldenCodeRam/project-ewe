import { z } from "zod";
import type { CreateUserForm } from "../../Types/Types";
import { Validator } from "./Validator";

export const UserValidator = new Validator<CreateUserForm>({
    firstName: z.string({
        required_error: "El nombre es requerido.",
    }),
    lastName: z.string({
        required_error: "El apellido es requerido.",
    }),
    email: z
        .string()
        .email({ message: "El correo tiene un formato inválido." }),
});
