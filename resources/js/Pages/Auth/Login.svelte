<script lang="ts">
    import LoginLayout from "../../Layouts/LoginLayout.svelte";
    import Input from "../../Components/Input/Input.svelte";
    import PrimaryButton from "../../Components/Button/PrimaryButton.svelte";
    import { LoginValidator } from "../../Functions/Validation/LoginValidator";
    import { LoginService } from "../../Functions/Services/LoginService";
    import LoadingModal from "../../Components/Modal/LoadingModal.svelte";
    import { toInputErrors } from "../../Types/Types";
    import { useLoginStore } from "../../Components/Stores/LoginStore";

    export let errors: { [key: string]: string };

    let loginStore = useLoginStore();

    async function login() {
        LoginValidator.validate(loginStore);
        if (!$loginStore.hasError) {
            $loginStore.isLoading = true;
            await LoginService.post($loginStore);
            $loginStore.isLoading = false;
        }
    }

    $: LoginValidator.setStoreErrors(loginStore, toInputErrors(errors));
</script>

<LoginLayout>
    <LoadingModal open={$loginStore.isLoading}>
        Iniciando sesión...
    </LoadingModal>

    <div class="container mx-auto py-8 h-full">
        <div class="flex flex-col justify-center items-center h-full">
            <div class="bg-white p-8 rounded shadow">
                <a href="/">
                    <img class="mx-auto w-20" src="/img/logo.svg" alt="Logo" />
                </a>
                <h1 class="text-center font-bold text-2xl text-gray-800">
                    Project Ewe
                </h1>
                <h2 class="text-center text-md text-gray-700">Ingresar</h2>

                <form on:submit|preventDefault={login}>
                    <div class="flex flex-col gap-2">
                        <Input
                            id="email"
                            label="Correo"
                            errors={$loginStore.fields.email.errors}
                            bind:value={$loginStore.fields.email.value}
                        />

                        <Input
                            id="password"
                            label="Contraseña"
                            type="password"
                            errors={$loginStore.fields.password.errors}
                            bind:value={$loginStore.fields.password.value}
                        />
                    </div>

                    <div class="my-4 text-center">
                        <PrimaryButton type="submit">Ingresar</PrimaryButton>
                    </div>
                </form>
            </div>
            <p class="text-gray-500 text-sm mt-1">Copyright, GoldenCodeRam</p>
        </div>
    </div>
</LoginLayout>
