export class Debouncer {
    private timeout: number = 0;

    debounce<T extends (...args: any[]) => any>(
        callback: T,
        wait: number = 500
    ) {
        const callable = (...args: any) => {
            this.stopTimeout();
            this.timeout = setTimeout(() => callback(...args), wait);
        };
        return <T>(<any>callable);
    }

    stopTimeout() {
        clearTimeout(this.timeout);
    }
}

