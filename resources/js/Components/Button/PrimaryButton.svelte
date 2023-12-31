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
    class="bg-slate-800 active:bg-slate-900 hover:bg-slate-700 text-white font-bold uppercase text-xs py-2 px-4 rounded"
>
    <slot />
</button>
