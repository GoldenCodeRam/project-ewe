<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import KeyEventHandler from "../../Compositors/KeyEventHandler.svelte";

    let isModalOpen = false;

    export function open() {
        isModalOpen = true;
    }

    export function close() {
        isModalOpen = false;
    }
</script>

{#if isModalOpen}
    <KeyEventHandler on:escape on:enter>
        <div
            transition:fade={{ duration: 300 }}
            class="absolute h-full w-full top-0 left-0 z-50 bg-black/30 flex flex-col justify-center items-center"
        >
            <div
                in:fly={{ delay: 300, y: 100 }}
                class="bg-white shadow-lg rounded p-4"
            >
                <div class="border-2 rounded p-4 max-w-lg">
                    <slot />
                </div>
            </div>
        </div>
    </KeyEventHandler>
{/if}
