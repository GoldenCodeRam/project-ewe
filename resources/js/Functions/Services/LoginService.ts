import { getValuesFromForm, type CreateProductForm, type LoginForm } from "../../Types/Types";
import { router } from "@inertiajs/svelte";

const POST_URL = "/login";

export const LoginService = {
    post: async (form: LoginForm) => {
        await router.post(POST_URL, getValuesFromForm(form));
    },
};
