export class ErrorTranslator {
    constructor(private translator: (error: string) => string) {}

    public translate(errors: { [key: string]: string[] }) {
        if (errors) {
            for (const key of Object.keys(errors)) {
                errors[key] = (errors[key] as string[])?.map(
                    (value) => this.translator(value),
                );
            }
        }
        return errors;
    }
}

export const SpanishErrorTranslator = new ErrorTranslator((error: string) => {
    switch (error) {
        case "These credentials do not match our records.":
            return "No encontramos estos credenciales en el sistema.";
        default:
            return error;
    }
});
