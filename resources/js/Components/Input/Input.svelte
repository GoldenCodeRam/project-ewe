<script lang="ts">
    import { fade } from "svelte/transition";

    export let id: string;
    export let label: string = "";
    export let placeholder: string = "";

    let hasError: boolean = false;
    let errorMessage: string = "Este es un error, porque el campo no es correcto uwu";

    const baseClass =
        "flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md";
    $: errorClass = hasError ? "bg-red-50 ring-red-400" : " focus-within:ring-gray-600";
</script>

<div>
    <label for={id} class="block text-sm font-medium leading-6 text-gray-900">
        {label ?? id}
    </label>
    <div class="{baseClass} {errorClass}">
        <input
            {id}
            type="text"
            class="outline-none block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            autocomplete="off"
            placeholder={placeholder}
        />

        {#if hasError}
            <div transition:fade>
                <i class="fa-solid fa-circle-exclamation text-red-500 px-2" />
            </div>
        {/if}
    </div>
    {#if hasError && errorMessage.length > 0}
        <div transition:fade>
            <p class="text-sm text-red-900">{errorMessage}</p>
        </div>
    {/if}
</div>
