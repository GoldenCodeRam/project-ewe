declare module "@inertiajs/svelte" {
    const router: {
        post(url: string, object: any);
        get(url: string);
    };
    const Link: new (...args: any) => any;
    const inertia: any;
}
