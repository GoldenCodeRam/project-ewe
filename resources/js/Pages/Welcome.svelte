<script lang="ts">
    import Input from "../Components/Input/Input.svelte";
    import MainLayout from "../Layouts/MainLayout.svelte";
    import Tooltip from "../Components/Tooltip.svelte";
    import { UserValidator } from "../Functions/Validation/Validation";
    import type { z } from "zod";
    import type { User } from "../Types/Types";
    import ConfirmationModal from "../Components/Modal/ConfirmationModal.svelte";

    let formErrors: z.typeToFlattenedError<User> | undefined;
    let user: User = {
        firstName: "",
        lastName: "",
        email: "",
    };

    let isConfirmUserCreateModalOpen = false;

    const userValidator = new UserValidator();
    function validateForm() {
        const validation = userValidator.validate(user);

        if (validation.success) {
            user = validation.data;
            formErrors = undefined;
            openConfirmUserCreateModal();
        } else {
            formErrors = validation.error.formErrors;
        }
    }

    function openConfirmUserCreateModal() {
        isConfirmUserCreateModalOpen = true;
    }

    function closeConfirmUserCreateModal() {
        isConfirmUserCreateModalOpen = false;
    }
</script>

<MainLayout>
    <ConfirmationModal
        isModalOpen={isConfirmUserCreateModalOpen}
        on:close={closeConfirmUserCreateModal}
    >
        Se creará el siguiente usuario:

        <div class="border rounded mt-2">
            <table class="table-fixed w-full text-sm divide-y">
                <tr>
                    <th class="w-4/12">Nombres</th>
                    <td class="border-s ps-2">{user.firstName}</td>
                </tr>
                <tr>
                    <th class="w-4/12">Apellidos</th>
                    <td class="border-s ps-2">{user.lastName}</td>
                </tr>
                <tr>
                    <th class="w-4/12">Correo</th>
                    <td class="border-s ps-2">{user.email}</td>
                </tr>
            </table>
        </div>
    </ConfirmationModal>

    <div class="container mx-auto py-8 h-full">
        <div class="bg-white rounded py-4 px-8 h-full">
            <h1 class="text-center font-bold text-2xl text-gray-800">
                Crear un usuario
            </h1>

            <form on:submit|preventDefault={validateForm}>
                <div class="flex flex-col gap-2">
                    <Input
                        id="firstName"
                        label="Nombres"
                        errors={formErrors?.fieldErrors.firstName}
                        bind:value={user.firstName}
                    />
                    <Input
                        id="lastName"
                        label="Apellidos"
                        errors={formErrors?.fieldErrors.lastName}
                        bind:value={user.lastName}
                    />
                    <Input
                        id="email"
                        label="Correo"
                        errors={formErrors?.fieldErrors.email}
                        bind:value={user.email}
                    />
                </div>

                <div class="my-4">
                    <Tooltip>
                        <div slot="tooltip">aoeu</div>
                        <button
                            type="submit"
                            class="bg-slate-900 text-white font-bold uppercase text-sm py-1 px-3 border border-gray-500 rounded shadow-[0_0.125rem_0_0_rgba(0,0,0,0.4)] -translate-y-0.5 active:translate-y-0 active:shadow-none"
                        >
                            <i class="fa-solid fa-plus" />
                            Crear
                        </button>
                    </Tooltip>
                </div>
            </form>
        </div>
    </div>
</MainLayout>
