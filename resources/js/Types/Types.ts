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

// This type comes from the pagination information returned by Laravel, that's
// why the variables have these names.
export type Pagination = {
    current_page: number;
    per_page: number;
    total: number;
    next_page_url?: string;
    prev_page_url?: string;
};

export type Response<T = any> = {
    data: T[];
};

export type PaginatedResponse<T = any> = Response<T> & Pagination;

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

export interface CreateProductForm extends Form {
    fields: {
        name: Input;
        value: Input;
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
    errors: InputErrors;
}

export function getValuesFromForm(form: Form) {
    const values: any = {};
    for (const key of Object.keys(form.fields)) {
        values[key] = form.fields[key as keyof typeof form.fields].value;
    }
    return values;
}
