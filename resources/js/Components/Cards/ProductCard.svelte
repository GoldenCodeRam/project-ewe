<script lang="ts">
    import type { Product } from "../../Types/Types";

    export let product: Product;
</script>

<button class="mx-auto text-start border shadow-md rounded px-4 py-4 cursor-pointer active:bg-gray-200 hover:bg-gray-100/50">
    <img src={product.images[0].url} alt={product.name} class="mx-auto w-48" />
    <div>
        <h1 class="text-lg pt-2 mb-[-8px]">{product.name}</h1>
        <h2 class="text-xl font-bold">{product.value}</h2>
    </div>
</button>
