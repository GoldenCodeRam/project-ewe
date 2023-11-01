<script>
    import { onMount } from "svelte";

    let dialog;

    let dragging;
    let left = 0;
    let top = 0;

    // Place the dialog on the center of the screen.
    onMount(() => {
        left = (window.innerWidth - dialog.offsetWidth) / 2;
        top = (window.innerHeight - dialog.offsetHeight) / 2;

        Object.assign(dialog.style, {
            left: `${left}px`,
            top: `${top}px`,
        });
    });

    function onMouseUp() {
        dragging = false;
    }

    function onMouseDown() {
        dragging = true;
    }

    function onMouseMove(event) {
        if (event && dragging) {
            left = Math.max(
                0,
                Math.min(
                    left + event.movementX,
                    window.innerWidth - dialog.offsetWidth
                )
            );
            top = Math.max(
                0,
                Math.min(
                    top + event.movementY,
                    window.innerHeight - dialog.offsetHeight
                )
            );

            Object.assign(dialog.style, {
                left: `${left}px`,
                top: `${top}px`,
            });
        }
    }
</script>

<section
    role="dialog"
    bind:this={dialog}
    on:pointerdown={onMouseDown}
    class="absolute w-max top-0 left-0 border bg-white shadow-lg p-2 rounded select-none"
>
    <slot />
</section>

<svelte:window on:pointerup={onMouseUp} on:pointermove={onMouseMove} />

<!-- Check that the pointer is still on the window -->
<svelte:document on:pointerleave={onMouseUp} />
