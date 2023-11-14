<script lang="ts">
    import AuthDropdown from "./Dropdown/AuthDropdown.svelte";
</script>

<header class="shadow-sm z-10 border-b">
    <div class="container mx-auto py-2">
        <div class="flex justify-between items-center">
            <a href="/">
                <img src="/img/logo.svg" class="w-12 h-auto" alt="Logo" />
            </a>
            <AuthDropdown />
        </div>
    </div>
</header>
