<script lang="ts">
    import Input from "../Components/Input/Input.svelte";
    import MainLayout from "../Layouts/MainLayout.svelte";
    import Tooltip from "../Components/Tooltip.svelte";
    import { UserValidator } from "../Functions/Validation/Validation";
    import type { z } from "zod";
    import type { User } from "../Types/Types";

    let formErrors: z.typeToFlattenedError<User>;
    let userForm = {
        firstName: "",
        email: "",
    };

    const userValidator = new UserValidator();
    function validateForm() {
        const validation = userValidator.validate(userForm);
        if (validation.success) {
            userForm = validation.data;
        } else {
            formErrors = validation.error.formErrors;
        }
    }
</script>

<MainLayout>
    {userForm.firstName}
    <div class="container mx-auto py-8 h-full">
        <div class="bg-white rounded py-4 px-8 h-full">
            <h1 class="text-center font-bold text-2xl text-gray-800">
                Crear un usuario
            </h1>

            <div class="flex flex-col gap-2">
                <Input
                    id="firstName"
                    label="Nombres"
                    errors={formErrors?.fieldErrors.firstName}
                    bind:value={userForm.firstName}
                />
                <Input
                    id="email"
                    label="Correo"
                    errors={formErrors?.fieldErrors.email}
                    bind:value={userForm.email}
                />
            </div>

            <div class="my-4">
                <Tooltip>
                    <div slot="tooltip">aoeu</div>
                    <button
                        on:click={validateForm}
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
