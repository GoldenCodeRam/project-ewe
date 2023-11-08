import { createInertiaApp } from "@inertiajs/svelte";

// Import TailwindCss
import "../css/app.css";

import axios from "axios";

// Credentials for API communication.
axios.defaults.withCredentials = true;

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.svelte", { eager: true });
        return pages[`./Pages/${name}.svelte`];
    },
    setup({ el, App, props }) {
        new App({ target: el, props });
    },
});
