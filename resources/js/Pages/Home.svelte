<script lang="ts">
    import { Link } from "@inertiajs/svelte";
    import { GlobalAuthStore } from "../Components/Stores/AuthStore";
    import MainLayout from "../Layouts/MainLayout.svelte";
    import ProductTable from "../Components/Tables/ProductTable.svelte";

    export let user: any;

    $GlobalAuthStore.user = user;
</script>

<MainLayout>
    <div class="grid h-full grid-cols-1 md:grid-cols-12">
        <div
            class="flex flex-col gap-3 col-span-4 bg-white shadow-md border-e px-6 py-4"
        >
            <h1 class="text-center font-bold text-xl">Objetos</h1>
            <Link
                href="/home/product/create"
                class="secondary-button text-center">Crear</Link
            >
        </div>
        <div class="col-span-8">
            <ProductTable />
        </div>
    </div>
</MainLayout>
