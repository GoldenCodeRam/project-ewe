<script>
    import MainFooter from "../Components/Footers/MainFooter.svelte";
    import GuestHeader from "../Components/Headers/GuestHeader.svelte";
</script>

<main class="h-full w-full flex flex-col">
    <GuestHeader />
    <article class="flex-1 bg-slate-200 max-h-full overflow-hidden">
        <slot />
    </article>
    <MainFooter />
</main>
