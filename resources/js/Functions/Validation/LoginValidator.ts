import { z } from "zod";
import type { CreateProductForm, LoginForm } from "../../Types/Types";
import { Validator } from "./Validator";
import { SpanishErrorTranslator } from "../Translator/ErrorTranslator";

export const LoginValidator = new Validator<LoginForm>(
    {
        email: z.string({ required_error: "El correo es requerido." }).email({
            message: "El correo tiene un formato inválido.",
        }),
        password: z
            .string({
                required_error: "La contraseña es requerida.",
            })
            .min(1, { message: "La contraseña es requerida." }),
    },
    SpanishErrorTranslator,
);

export const CreateObjectValidator = new Validator<CreateProductForm>(
    {
        name: z
            .string({
                required_error: "El nombre del objeto es requerido.",
            })
            .min(1, { message: "El nombre del objeto es requerido." }),
        value: z.string({
            required_error: "El objeto debe tener un valor."
        })
    },
    SpanishErrorTranslator,
);
