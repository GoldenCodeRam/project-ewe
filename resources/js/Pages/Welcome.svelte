<script>
    import LinkButton from "../Components/Button/LinkButton.svelte";
    import PrimaryButton from "../Components/Button/PrimaryButton.svelte";
    import { createProductStore } from "../Functions/Services/ProductService";
    import GuestLayout from "../Layouts/GuestLayout.svelte";

    const productStore = createProductStore();

</script>

<GuestLayout>
    <div class="container mx-auto py-8 min-h-full">
        <div class="bg-white rounded py-4 px-8 min-h-full">
            <div
                class="relative isolate flex justify-center gap-20 overflow-hidden"
            >
                <div
                    class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left"
                >
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                        Boost your productivity.<br />Start using our app today.
                    </h2>
                    <p class="mt-6 text-lg leading-8 text-gray-300">
                        Ac euismod vel sit maecenas id pellentesque eu sed
                        consectetur. Malesuada adipiscing sagittis vel nulla.
                    </p>
                    <div
                        class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"
                    >
                        <PrimaryButton>Shop now</PrimaryButton>
                        <LinkButton>
                            See more
                            <i class="fa-solid fa-arrow-right"></i>
                        </LinkButton>
                    </div>
                </div>
                <img
                    class="hidden sm:block w-[20rem] max-w-none"
                    src="/img/logo.svg"
                    alt="App screenshot"
                />
            </div>

            <div class="py-4">
                {#each $productCategoryStore.data as category}
                    <h1 class="text-lg">
                        {category.name}
                    </h1>
                {/each}
            </div>
        </div>
    </div>
</GuestLayout>
