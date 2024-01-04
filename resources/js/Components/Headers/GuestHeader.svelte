<script>
    import LinkButton from "../Button/LinkButton.svelte";
</script>

<header class="shadow-sm z-10 border-b border-gray-300">
    <div class="container mx-auto py-2 px-4">
        <div class="flex justify-between items-center">
            <a href="/">
                <img src="/img/logo.svg" class="w-12 h-auto" alt="Logo" />
            </a>
            <div>
                <LinkButton>Log in</LinkButton>
            </div>
        </div>
    </div>
</header>
