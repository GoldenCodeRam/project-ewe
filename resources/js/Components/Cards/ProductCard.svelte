<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Spinner } from "flowbite-svelte";
    import type { Product } from "../../Types/Types";

    export let product: Product;
    let loaded = false;
    let error = false;

    const dispatch = createEventDispatcher();

    function imageLoaded() {
        loaded = true;
        dispatch("imageLoaded");
    }
</script>

<button
    class="mx-auto text-start border shadow-md rounded px-4 py-4 cursor-pointer active:bg-gray-200 hover:bg-gray-100/50"
>
    {#if !loaded && !error}
        <span class="flex justify-center items-center w-48 h-48">
            <Spinner />
        </span>
    {:else if error}
        <img src="/img/placeholder.png" class="w-48" alt="Not found." />
    {/if}
    <img
        on:load={imageLoaded}
        on:error={() => (error = true)}
        src={product.images[0].url}
        alt={product.name}
        class:hidden={!loaded}
        class="mx-auto w-48"
    />
    <div>
        <h1 class="text-lg pt-2 mb-[-8px]">{product.name}</h1>
        <h2 class="text-xl font-bold">{product.value}</h2>
    </div>
</button>
