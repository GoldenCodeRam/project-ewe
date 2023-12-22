<script>
    import MainHeader from "../Components/Headers/MainHeader.svelte";
</script>

<main class="h-full w-full flex flex-col">
    <MainHeader />
    <article class="flex-1 bg-slate-200 max-h-full overflow-hidden">
        <slot />
    </article>
</main>
