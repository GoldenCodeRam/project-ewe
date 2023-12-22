<script>
    import { createProductService } from "../Functions/Services/ProductService";
    import GuestLayout from "../Layouts/GuestLayout.svelte";

    const productService = createProductService();

    productService.service.get()
</script>

<GuestLayout>
    <div class="container mx-auto py-8 h-full">
        <div class="bg-white rounded py-4 px-8 h-full">
            <h1 class="text-center font-bold text-2xl text-gray-800">
                Crear un usuario
            </h1>
        </div>
    </div>
</GuestLayout>
