<script lang="ts">
    import { GlobalAuthStore } from "../../Components/Stores/AuthStore";
    import MainLayout from "../../Layouts/MainLayout.svelte";
    import Input from "../../Components/Input/Input.svelte";
    import FormattedInput from "../../Components/Input/FormattedInput.svelte";
    import { CreateObjectValidator } from "../../Functions/Validation/LoginValidator";
    import { toInputErrors } from "../../Types/Types";
    import { useCreateProductStore } from "../../Components/Stores/ProductStore";
    import LoadingModal from "../../Components/Modal/LoadingModal.svelte";

    export let errors: { [key: string]: string };
    export let user: any;

    $GlobalAuthStore.user = user;

    let store = useCreateProductStore();

    let productService = null;
    let productLoadingService = productService.service.loadingStore;

    async function createObject() {
        CreateObjectValidator.validate(store);
        if (!$store.hasError) {
            productService.service.post($store);
        }
    }

    $: CreateObjectValidator.setStoreErrors(store, toInputErrors(errors));
</script>

<MainLayout>
    <LoadingModal open={$productLoadingService.isLoading}>
        Creando producto...
    </LoadingModal>

    <div class="container mx-auto p-4 max-w-xl h-full">
        <div class="bg-white px-6 py-4 rounded shadow">
            <h1 class="text-xl font-bold text-center">Crear Objeto</h1>
            <form
                on:submit|preventDefault={createObject}
                class="grid gap-2 mx-auto py-4"
            >
                <Input
                    id="name"
                    label="Nombre"
                    errors={$store.fields.name.errors}
                    bind:value={$store.fields.name.value}
                />
                <FormattedInput
                    id="value"
                    label="Valor"
                    placeholder="$ 123"
                    errors={$store.fields.value.errors}
                    bind:realValue={$store.fields.value.value}
                />
                <button class="primary-button mx-auto" type="submit">
                    <i class="fa-solid fa-plus" />
                    Crear
                </button>
            </form>
        </div>
    </div>
</MainLayout>
