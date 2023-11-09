export type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
};

export type Input = {
    value?: string;
    errors?: string[];
};

export interface Form {
    isLoading: boolean;
    hasError: boolean;
    fields: { [key: string]: Input };
}

export interface LoginForm extends Form {
    fields: {
        email: Input;
        password: Input;
    };
}

export interface CreateUserForm extends Form {
    fields: {
        firstName: Input;
        lastName: Input;
        email: Input;
    };
}

export interface ResponseInputError {
    message: string;
    errors: { [key: string]: string[] };
}

export function getValuesFromForm(form: Form) {
    const values: any = {};
    for (const key of Object.keys(form.fields)) {
        values[key] = form.fields[key as keyof typeof form.fields].value;
    }
    return values;
}
