<script lang="ts">
    import PrimaryButton from "../Button/PrimaryButton.svelte";
    import SecondaryButton from "../Button/SecondaryButton.svelte";
    import Modal from "./Modal.svelte";

    import { createEventDispatcher } from "svelte";

    const dispatcher = createEventDispatcher();

    export let modalTitle: string;

    let modal: Modal;

    export function open() {
        modal.open();
    }

    function cancel() {
        dispatcher("cancel");
        modal.close();
    }

    function accept() {
        dispatcher("accept");
        modal.close();
    }
</script>

<Modal
    bind:this={modal}
    on:escape={cancel}
    on:enter={accept}
>
    <div class="bg-white rounded shadow p-4">
        <div class="flex justify-between pb-4">
            <span />
            <h1 class="font-bold text-center">
                {modalTitle}
            </h1>
            <div>
                <SecondaryButton on:click={cancel}>
                    <i class="fa-solid fa-xmark" />
                </SecondaryButton>
            </div>
        </div>
        <slot />
        <div class="text-center mt-4">
            <SecondaryButton on:click={cancel}>Cancelar</SecondaryButton>
            <PrimaryButton on:click={accept} focus>Aceptar</PrimaryButton>
        </div>
    </div>
</Modal>
