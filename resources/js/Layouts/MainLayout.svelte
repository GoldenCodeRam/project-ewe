<script>
    import Header from "../Components/Header.svelte";
</script>

<main class="h-full w-full flex flex-col">
    <Header />
    <article class="flex-1 bg-slate-200">
        <slot />
    </article>
</main>
