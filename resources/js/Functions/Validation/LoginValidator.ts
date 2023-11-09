import { z } from "zod";
import type { LoginForm } from "../../Types/Types";
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
