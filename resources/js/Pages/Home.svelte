<script lang="ts">
    import { Link } from "@inertiajs/svelte";
    import { GlobalAuthStore } from "../Components/Stores/AuthStore";
    import MainLayout from "../Layouts/MainLayout.svelte";
    import ProductTable from "../Components/Tables/ProductTable.svelte";

    export let user: any;
    $GlobalAuthStore.user = user;
</script>

<MainLayout>
    <div class="container mx-auto h-full">
        <div class="grid h-full grid-cols-1 md:grid-cols-12">
            <div
                class="flex flex-col gap-3 col-span-4 bg-white shadow-md border-e px-6 py-4 rounded"
            >
                <h1 class="text-center font-bold text-xl">Objetos</h1>
                <div
                    class="border-dotted border-gray-300 border-2 bg-gray-50 rounded-md pb-4 px-4 mx-auto"
                >
                    <h1
                        class="text-center font-bold text-xs pt-1 pb-2 text-gray-500"
                    >
                        Acciones
                    </h1>
                    <div class="flex flex-wrap gap-3">
                        <Link
                            href="/home/product/create"
                            class="secondary-button"
                        >
                            <i class="fa-solid fa-plus text-xl" />
                            <br />
                            Crear
                        </Link>
                    </div>
                </div>
            </div>
            <div class="col-span-8 w-full overflow-hidden">
                <ProductTable />
            </div>
        </div>
    </div>
</MainLayout>
