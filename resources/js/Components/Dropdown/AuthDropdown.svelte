<script lang="ts">
    import { inertia, Link } from "@inertiajs/svelte";
    import { GlobalAuthStore } from "../Stores/AuthStore";
    import Dropdown from "./Dropdown.svelte";
</script>

<Dropdown class="secondary-button-outline">
    <span slot="button">
        {#if !$GlobalAuthStore.user}
            <div
                class="flex w-7 h-7 items-center justify-center mx-auto text-gray-500"
            >
                <i class="animate-spin fa-solid fa-spinner" />
            </div>
        {:else}
            <div>
                <i class="fa-solid fa-user" />
                {$GlobalAuthStore.user.name}
            </div>
        {/if}
    </span>
    <span slot="dropdown">
        <div class="mt-1 shadow-md border rounded bg-white w-40 text-gray-500">
            <div class="grid divide-y">
                <div class="grid text-gray-500">
                    <Link class="px-2 py-1 hover:bg-gray-100" href="/">
                        <i class="fa-solid fa-gear text-sm" />
                        Cuenta
                    </Link>
                    <Link class="px-2 py-1 hover:bg-gray-100" href="/home">
                        <i class="fa-solid fa-gear text-sm" />
                        Configuración
                    </Link>
                </div>

                <button
                    use:inertia={{ href: "/logout", method: "post" }}
                    class="px-2 py-1 hover:bg-red-50/80 text-red-400 text-start"
                >
                    <i class="fa-solid fa-door-open text-sm" />
                    Salir
                </button>
            </div>
        </div>
    </span>
</Dropdown>
