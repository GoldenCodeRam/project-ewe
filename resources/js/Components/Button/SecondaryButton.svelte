<script>
    let buttonProps = {
        class: [$$restProps.class],
    };
</script>

<button
    on:click
    {...buttonProps}
    class="bg-white px-2 py-1 font-bold uppercase text-xs border border-gray-500 rounded shadow-[0_0.125rem_0_0_rgba(0,0,0,0.4)] -translate-y-0.5 active:translate-y-0 active:shadow-none active:bg-gray-300 hover:bg-gray-100"
>
    <slot />
</button>
