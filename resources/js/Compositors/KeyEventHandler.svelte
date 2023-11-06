<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function handleKeyEvents(event: KeyboardEvent) {
        switch (event.key) {
            case "Enter":
                return dispatch("enter");
            case "Escape":
                return dispatch("escape");
        }
    }
</script>

<slot />

<!-- Handle common key events -->
<svelte:window on:keydown={handleKeyEvents} />
