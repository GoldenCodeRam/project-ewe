<script lang="ts">
    import Input from "../Components/Input/Input.svelte";
    import MainLayout from "../Layouts/MainLayout.svelte";
    import Tooltip from "../Components/Tooltip.svelte";
    import ConfirmationModal from "../Components/Modal/ConfirmationModal.svelte";

    import type { z } from "zod";
    import type { User } from "../Types/Types";
    import LoadingModal from "../Components/Modal/LoadingModal.svelte";
    import ErrorModal from "../Components/Modal/ErrorModal.svelte";
    import { UserService } from "../Services/UserService";
    import { userValidator } from "../Functions/Validation/Validation";

    let formErrors: z.typeToFlattenedError<User> | undefined;
    let user: User = {
        firstName: "",
        lastName: "",
        email: "",
    };

    let confirmationModal: ConfirmationModal;
    let loadingModal: LoadingModal;
    let errorModal: ErrorModal;

    function validateForm() {
        const validation = userValidator.validate(user);

        if (validation.success) {
            user = validation.data;
            formErrors = undefined;
            confirmationModal.open();
        } else {
            formErrors = validation.error.formErrors;
        }
    }

    async function createUser() {
        try {
            const request = UserService.createUser();
            await loadingModal.withLoading(request);
        } catch (e: any) {
            errorModal.open();
        } finally {
        }
    }
</script>

<MainLayout>
    <ConfirmationModal
        bind:this={confirmationModal}
        modalTitle="Crear usuario"
        on:accept={createUser}
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

    <LoadingModal bind:this={loadingModal}>Creando usuario...</LoadingModal>

    <ErrorModal bind:this={errorModal} />

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
