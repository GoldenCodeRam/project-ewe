<script>
    import { createEventDispatcher } from "svelte";

    import Dialog from "./Dialog.svelte";

    const dispatch = createEventDispatcher();

    function accept() {
        dispatch("accept");
    }
</script>

<Dialog>
    <div class="border-2 border-red-200 rounded mt-3 px-4 py-2 flex flex-col">
        <span
            class="border-2 rounded-full border-red-300 -mt-6 mb-2 bg-white w-8 h-8 m-auto text-center flex justify-center items-center"
        >
            <i class="fa-solid fa-xmark text-red-400" />
        </span>

        <slot />

        <div class="mx-auto mt-2">
            <button
                class="bg-red-700 active:bg-red-800 text-white rounded px-2 py-1"
                on:click={accept}
            >
                Aceptar
            </button>
        </div>
    </div>
</Dialog>
