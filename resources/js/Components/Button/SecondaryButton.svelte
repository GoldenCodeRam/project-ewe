<script>
    let buttonProps = {
        class: [$$restProps.class],
    };
</script>

<button
    on:click
    {...buttonProps}
    class="bg-white py-2 px-4 font-bold uppercase text-xs border border-gray-500 rounded"
>
    <slot />
</button>
