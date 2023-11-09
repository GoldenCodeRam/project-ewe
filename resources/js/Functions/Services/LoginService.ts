import { getValuesFromForm, type LoginForm, type ResponseInputError } from "../../Types/Types";
import axios, { AxiosError } from "axios";

const POST_URL = "/login";

function parseError(error: AxiosError<ResponseInputError>) {
    // The error has to have a response. Fail otherwise.
    switch (error.response!.status) {
        case 422:
            return error.response!.data.errors;
    }
}

export const LoginService = {
    post: async (form: LoginForm) => {
        try {
            const response = await axios.post(POST_URL, getValuesFromForm(form));
        } catch (e: any) {
            switch (true) {
                case e instanceof AxiosError:
                    return parseError(e);
                // If it's not an AxiosError, then don't handle it.
                default:
                    throw e;
            }
        }
    },
};
