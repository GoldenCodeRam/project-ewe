<script lang="ts">
    import { onMount } from "svelte";

    import Glide from "@glidejs/glide";
    import ProductCard from "../Cards/ProductCard.svelte";
    import LinkButton from "../Button/LinkButton.svelte";
    import {
        ProductActions,
        createProductsService,
    } from "../../Functions/Services/ProductService";
    import type { Category } from "../../Types/Types";

    export let category: Category;

    let carousel: HTMLDivElement;

    const service = createProductsService();
    const store = service.store;

    new ProductActions().findAll(service, {
        category: category.id,
    });

    function renderCarousel(node: HTMLDivElement) {
        new Glide(node, {
            type: "slider",
            perView: 4,
            startAt: 5 / 2,
            gap: 20,
            focusAt: "center",
            breakpoints: {
                // Tailwindcss inspired breaking sizes.
                768: {
                    perView: 3,
                },
                640: {
                    perView: 1,
                },
            },
        }).mount();
    }
</script>

<div class="px-4 py-8">
    <div class="max-w-4xl mx-auto">
        <h4 class="text-xs mb-[-4px] text-gray-400">Category</h4>
        <h1 class="text-2xl font-bold mb-4 uppercase">{category.name}</h1>
    </div>

    {#if $store?.data}
        <div class="glide" use:renderCarousel>
            <div data-glide-el="track" class="glide__track py-2">
                <ul class="glide__slides overflow-visible">
                    {#each $store.data.slice(0, 5) as product}
                        <li class="glide__slide text-center">
                            <ProductCard {product} />
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    {/if}

    <div class="text-center py-4">
        <LinkButton>
            See more
            <i class="fa-solid fa-arrow-right"></i>
        </LinkButton>
    </div>
</div>
