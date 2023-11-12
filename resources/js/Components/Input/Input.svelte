<script lang="ts">
    import { fade } from "svelte/transition";

    const props = {
        type: $$props.type,
    };

    export let id: string;
    export let label: string;
    export let placeholder: string = "";

    export let errors: string[] | undefined;
    export let value: string | undefined;

    const baseClass =
        "flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md";
    $: errorClass =
        errors && errors.length > 0
            ? "bg-red-50 ring-red-400"
            : " focus-within:ring-gray-600";
</script>

<div class="mx-auto">
    <label for={id} class="block text-sm font-medium leading-6 text-gray-900">
        {label ?? id}
    </label>
    <div class="{baseClass} {errorClass}">
        <!-- Main component -->
        <input
            {id}
            class="outline-none block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            autocomplete="off"
            bind:value
            {placeholder}
            {...props}
        />

        {#if errors && errors.length > 0}
            <div transition:fade>
                <i class="fa-solid fa-circle-exclamation text-red-500 px-2" />
            </div>
        {/if}
    </div>
    {#if errors && errors.length > 0}
        <div transition:fade>
            <p class="text-sm text-red-900">{errors}</p>
        </div>
    {/if}
</div>
