<script lang="ts">
    import Modal from "./Modal.svelte";

    // TODO: We could add something like a loading cancel, that stops the
    // execution if needed.

    let modal: Modal;

    export let open: boolean;
    $: open ? modal?.open() : modal?.close();

    export async function withLoading(callback: Promise<any>) {
        modal.open();
        // Attach the finally of the callback to close the modal.
        return callback.finally(() => {
            modal.close();
        });
    }
</script>

<Modal bind:this={modal}>
    <div class="bg-white p-4 pt-6 rounded shadow">
        <div class="p-4 border-2">
            <div
                class="relative -mt-8 mb-2 bg-white border-2 rounded-full flex w-7 h-7 items-center justify-center mx-auto"
            >
                <i class="animate-spin fa-solid fa-spinner" />
            </div>
            <slot />
        </div>
    </div>
</Modal>
