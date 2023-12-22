<script>
    let buttonProps = {
        class: [$$restProps.class],
    };
</script>

<button
    on:click
    {...buttonProps}
    class="bg-white px-2 py-1 font-bold uppercase text-xs text-slate-500 rounded active:bg-gray-300 hover:bg-gray-100"
>
    <slot />
</button>
