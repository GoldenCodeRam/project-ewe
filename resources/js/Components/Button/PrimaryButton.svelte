<script lang="ts">
    let buttonProps = {
        class: [$$restProps.class],
    };

    export let focus: boolean = false;

    /**
    * If when mounted the button should be focused or not.
    */
    function hasFocus(element: HTMLButtonElement) {
        if (focus) {
            element.focus();
        }
    }
</script>

<button
    on:click
    {...buttonProps}
    use:hasFocus
    class="bg-slate-800 active:bg-slate-900 hover:bg-slate-700 text-white font-bold uppercase text-xs py-1 px-3 border border-gray-500 rounded shadow-[0_0.125rem_0_0_rgba(0,0,0,0.4)] -translate-y-0.5 active:translate-y-0 active:shadow-none"
>
    <slot />
</button>
