<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    import PrimaryButton from "../Button/PrimaryButton.svelte";
    import SecondaryButton from "../Button/SecondaryButton.svelte";

    const dispatch = createEventDispatcher();

    export let isModalOpen = false;

    function close() {
        dispatch("close");
    }
</script>

{#if isModalOpen}
    <div
        transition:fade={{ duration: 300 }}
        class="absolute h-full w-full top-0 left-0 z-50 bg-black/30 flex flex-col justify-center items-center"
    >
        <div
            in:fly={{ delay: 300, y: 100 }}
            class="bg-white shadow-lg rounded p-4"
        >
            <div class="border-2 rounded p-4 max-w-lg">
                <div class="flex justify-between pb-4">
                    <span />
                    <h1 class="font-bold text-center">Crear usuario</h1>
                    <div>
                        <SecondaryButton on:click={close}>
                            <i class="fa-solid fa-xmark" />
                        </SecondaryButton>
                    </div>
                </div>
                <slot />
                <div class="text-center mt-4">
                    <SecondaryButton on:click={close}>Cancelar</SecondaryButton>
                    <PrimaryButton>Aceptar</PrimaryButton>
                </div>
            </div>
        </div>
    </div>
{/if}
