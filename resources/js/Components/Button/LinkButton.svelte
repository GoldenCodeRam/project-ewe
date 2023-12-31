<script>
    let buttonProps = {
        class: [$$restProps.class],
    };
</script>

<button
    on:click
    {...buttonProps}
    class="bg-white px-4 py-2 font-bold uppercase text-xs text-slate-600 rounded active:bg-gray-300 hover:bg-gray-100"
>
    <slot />
</button>
