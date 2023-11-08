<script lang="ts">
    import Modal from "./Modal.svelte";

    // TODO: We could add something like a loading cancel, that stops the
    // execution if needed.

    let modal: Modal;

    export function open() {
        modal.open();
    }

    export function close() {
        modal.close();
    }
</script>

<Modal bind:this={modal}>
    <div class="bg-white p-4 pt-6 rounded shadow">
        <div class="border-2 border-red-700/60 rounded p-4">
            <div
                class="relative -mt-8 mb-2 bg-white border-2 border-red-700/60 text-red-700/60 rounded-full flex w-7 h-7 items-center justify-center mx-auto"
            >
                <i class="fa-solid fa-times" />
            </div>
            Mensaje de éxito
            <br />
        </div>
    </div>
</Modal>
