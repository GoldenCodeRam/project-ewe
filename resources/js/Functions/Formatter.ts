type FormatFunction = (str: string) => string;

abstract class Formatter {
    protected str: string = "";

    protected abstract formatRules(): Rule[];
    protected abstract realRules(): Rule[];
    protected abstract finalFormatting(): string;

    public toFormattedValue(str: string): string | null {
        this.str = str;
        return this.extractRealValue()?.fromRealToFormattedValue()?.finalFormatting() ?? null;
    }

    public toRealValue(str: string): string {
        let format = str;
        for (const rule of this.realRules()) {
            format = rule.replace(format);
        }
        return format;
    }

    private extractRealValue() {
        for (const rule of this.realRules()) {
            this.str = rule.replace(this.str);
        }
        return this;
    }

    private fromRealToFormattedValue() {
        let didFormat = false;
        for (const rule of this.formatRules()) {
            const format = rule.format(this.str);
            if (format) {
                this.str = format;
                didFormat = true;
            }
        }

        return didFormat ? this : null;
    }
}

export class Rule {
    private regex: RegExp;
    private func: FormatFunction;

    constructor(regex: RegExp, func: FormatFunction) {
        this.regex = regex;
        this.func = func;
    }

    format(str: string) {
        const match = str.match(this.regex);
        if (match) {
            if (this.func) {
                return this.func(match[0]);
            }
            return match[0];
        }
        return null;
    }

    replace(str: string) {
        if (this.func) {
            return str.replace(this.regex, this.func(""));
        }
        return str;
    }
}

class COPCurrencyFormatter extends Formatter {
    protected formatRules(): Rule[] {
        return [
            new Rule(/^[0-9]+$/, (str) =>
                str
                    .split("")
                    .reverse()
                    .join("")
                    .match(/[0-9]{1,3}/g)!
                    .map((s: string) => s.split("").reverse().join(""))
                    .reverse()
                    .join(".")
            ),
            new Rule(/^[0-9]+\.$/, (str) =>
                str
                    .replace(".", ",")
                    .split("")
                    .reverse()
                    .join("")
                    .match(/,?[0-9]{1,3}/g)!
                    .map((s) => s.split("").reverse().join(""))
                    .reverse()
                    .join(".")
            ),
            new Rule(/^[0-9]+\.([0-9]{1,2})$/, (str) =>
                str
                    .replace(".", ",")
                    .split("")
                    .reverse()
                    .join("")
                    .match(/([0-9]{1,2},)?[0-9]{1,3}/g)!
                    .map((s) => s.split("").reverse().join(""))
                    .reverse()
                    .join(".")
            ),
            new Rule(/^\.([0-9]{1,2})$/, (str) => `0${str}`),
        ];
    }

    protected realRules(): Rule[] {
        return [
            new Rule(/[$ \.]/g, () => ""),
            new Rule(/[,]/g, () => "."),
        ];
    }

    protected finalFormatting(): string {
        return `$ ${this.str}`;
    }
}

const COPFormatter = new COPCurrencyFormatter();

export {
    COPFormatter,
}
