<script lang="ts">
    import { Link } from "@inertiajs/svelte";
    import { GlobalAuthStore } from "../Components/Stores/AuthStore";
    import MainLayout from "../Layouts/MainLayout.svelte";
    import { onMount } from "svelte";
    import { createProductService } from "../Functions/Services/ProductService";

    export let user: any;
    $GlobalAuthStore.user = user;

    type Page = {
        page: number;
        content: any[];
    };

    let container: HTMLSpanElement;
    let scrollable: HTMLDivElement;

    let data: Page[] = [];
    let expandedData: any[] = [];

    const maxDataStorage = 100;

    const productService = createProductService();
    const productServiceStore = productService.service.store;
    const productServiceLoadingStore = productService.service.loadingStore;

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                if ($productServiceStore.next_page_url) {
                    productService.paginationService.getNextPage();
                }
            }
        },
        {
            rootMargin: "0px",
            threshold: 0.6,
        }
    );

    onMount(() => {
        // Wait until the view is loaded.
        productService.service.get();
    });

    $: if ($productServiceStore.current_page > 0) {
        addPageBottom();
        addExpandedData();

        // The virtual list is too large to add more data, start to remove
        // values.
        if (maxDataStorage <= expandedData.length) {
            const removed = data.shift();

            expandedData.splice(0, removed?.content.length);
            expandedData = expandedData;
        }

        observer.unobserve(container);
        if ($productServiceStore.next_page_url) {
            console.log($productServiceStore.current_page);
            observer.observe(container);
        } else {
        }
    }

    function pagesToContentArray() {}

    function addPageBottom() {
        const last = data[data.length - 1];

        if (last) {
            data.push({
                page: last.page + 1,
                content: $productServiceStore.data,
            });
        } else {
            data.push({
                page: 1,
                content: $productServiceStore.data,
            });
        }
    }

    function addExpandedData() {
        expandedData.push(...$productServiceStore.data);
        expandedData = expandedData;
    }
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
            <div
                bind:this={scrollable}
                class="col-span-8 overflow-auto bg-gray-300"
            >
                <div class="p-8">
                    <div class="p-4 bg-white rounded shadow relative">
                        {#each expandedData as test}
                            <h1 class="bg-red-300 h-32">
                                {test.name}
                            </h1>
                        {/each}
                        <span
                            bind:this={container}
                            class="absolute bottom-0 bg-yellow-300 h-[50vh]"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</MainLayout>
