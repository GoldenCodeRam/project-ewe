<script lang="ts">
    import { computePosition, offset, flip, shift } from "@floating-ui/dom";
    import { fade } from "svelte/transition";

    import Input from "../Components/Input/Input.svelte";
    import MainLayout from "../Layouts/MainLayout.svelte";
    import Tooltip from "../Components/Tooltip.svelte";
</script>

<MainLayout>
    <div class="container mx-auto py-8 h-full">
        <div class="bg-white rounded py-4 px-8 h-full">
            <h1 class="text-center font-bold text-2xl text-gray-800">
                Crear un usuario
            </h1>

            <div class="flex flex-col gap-2">
                <Input id="name" label="Nombre" />
                <Input id="name" label="Correo" />
            </div>

            <div class="my-4">
                <Tooltip>
                    <div slot="tooltip">aoeu</div>
                    <button
                        class="bg-slate-900 text-white font-bold uppercase text-sm py-1 px-3 border border-gray-500 rounded shadow-[0_0.125rem_0_0_rgba(0,0,0,0.4)] -translate-y-0.5 active:translate-y-0 active:shadow-none"
                    >
                        <i class="fa-solid fa-plus" />
                        Crear
                    </button>
                </Tooltip>
            </div>
        </div>
    </div>
</MainLayout>
