import { z } from "zod";

import { get, type Writable } from "svelte/store";
import { getValuesFromForm, type Form } from "../../Types/Types";
import type { ErrorTranslator } from "../Translator/ErrorTranslator";

export class ParseFieldsError extends Error {
    constructor() {
        super(
            "Check the validation object, as it might have fields that the form object doesn't have.",
        );
    }
}

export class Validator<T extends Form = Form> {
    constructor(
        private validationObject: z.ZodRawShape,
        private errorTranslator?: ErrorTranslator,
    ) {}

    public getStoreValue(store: Writable<T>): T {
        return get(store);
    }

    public validate(store: Writable<T>) {
        const parse = z
            .object(this.validationObject)
            .safeParse(getValuesFromForm(this.getStoreValue(store)));

        // Remove the store errors before validation.
        this.removeStoreErrors(store);

        // Assign the parsing errors to the form fields.
        if (!parse.success) {
            this.setStoreErrors(store, parse.error.flatten().fieldErrors);
        }

        // If the parsing has an error and the store fields don't have any
        // errors, this means that the validation object is wrong.
        if (!parse.success && !this.getStoreValue(store).hasError) {
            throw new ParseFieldsError();
        }

        return this;
    }

    public setStoreErrors(
        store: Writable<T>,
        errors: { [key: string]: string[] | undefined },
    ) {
        // If has a translator attached to this validator.
        if (this.errorTranslator) {
            errors = this.errorTranslator.translate(errors);
        }

        store.update((store) => {
            store.hasError = true;
            for (const key of Object.keys(errors)) {
                // If the store has the same field as the parsing error field.
                if (store.fields[key as keyof typeof store.fields]) {
                    store.fields[key as keyof typeof store.fields].errors =
                        errors[key as keyof typeof errors];
                }
            }

            return store;
        });
    }

    private removeStoreErrors(store: Writable<T>) {
        store.update((store) => {
            store.hasError = false;
            for (const key of Object.keys(store.fields)) {
                store.fields[key as keyof typeof store.fields].errors =
                    undefined;
            }

            return store;
        });
    }
}
