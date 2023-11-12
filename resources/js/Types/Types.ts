export type InputErrors = { [key: string]: string[] };

export function toInputErrors(errorObject: {
    [key: string]: string;
}): InputErrors {
    const result: InputErrors = {};
    for (const key in errorObject) {
        result[key] = [errorObject[key as keyof typeof errorObject]];
    }
    return result;
}

export type User = {
    name?: string;
    email?: string;
};

export type Input = {
    value: string;
    errors?: string[];
};

export type Auth = {
    user?: User;
};

export type Product = {
    name: string;
    value: number;
}

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

export interface CreateProductForm extends Form {
    fields: {
        name: Input;
        value: Input;
    }
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
    errors: InputErrors;
}

export function getValuesFromForm(form: Form) {
    const values: any = {};
    for (const key of Object.keys(form.fields)) {
        values[key] = form.fields[key as keyof typeof form.fields].value;
    }
    return values;
}
