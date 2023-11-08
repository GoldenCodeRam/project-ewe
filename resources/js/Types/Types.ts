export type User = {
    firstName?: string,
    lastName?: string,
    email?: string,
}

export type Input = {
    value?: string;
    errors?: string[];
};

export type Login = {
    email: Input;
    password: Input;
};
