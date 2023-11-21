<script lang="ts">
    import type { PaginationService } from "../Functions/Services/Service";

    enum ButtonAction {
        NEXT,
        PREVIOUS,
        BACKWARD,
        FORWARD,
    }

    export let service: PaginationService;
    const serviceStore = service.getServiceStore();

    const PAGINATOR_SIZE = 5;
    const buttonStatus = {
        forward: {
            enabled: false,
        },
        backward: {
            enabled: false,
        },
        next: {
            enabled: false,
        },
        previous: {
            enabled: false,
        },
    };

    let numbers: number[] = [];

    function getPaginationNumbers(currentPage: number): number[] {
        // This should never happen, but to avoid errors, it's set.
        if ($serviceStore) {
            const start = Math.max(
                1,
                Math.ceil(currentPage - PAGINATOR_SIZE / 2)
            );
            const end = Math.min(
                getTotalPages(),
                Math.floor(currentPage + PAGINATOR_SIZE / 2)
            );
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }
        return [];
    }

    function getTotalPages(): number {
        if ($serviceStore) {
            return Math.ceil($serviceStore.total / $serviceStore.per_page);
        }
        return 0;
    }

    function go(pageNumber: number) {
        service.getPage(pageNumber);
    }

    function action(buttonAction: ButtonAction) {
        if ($serviceStore) {
            switch (buttonAction) {
                case ButtonAction.NEXT:
                    return service.getNextPage();
                case ButtonAction.PREVIOUS:
                    return service.getPreviousPage();
                case ButtonAction.BACKWARD:
                    return service.getStartPage();
                case ButtonAction.FORWARD:
                    return service.getEndPage();
                default:
                    throw Error("ButtonAction not registered!");
            }
        }
    }

    $: {
        console.log($serviceStore.next_page_url);
        if ($serviceStore) {
            buttonStatus.forward.enabled =
                $serviceStore.current_page < getTotalPages();
            buttonStatus.backward.enabled = $serviceStore.current_page > 1;
            buttonStatus.next.enabled = $serviceStore.next_page_url
                ? true
                : false;
            buttonStatus.previous.enabled = $serviceStore.prev_page_url
                ? true
                : false;

            numbers = getPaginationNumbers($serviceStore.current_page);
        }
    }
</script>

<!-- If the current_page is less than 0, it means that the content is not
loaded, so don't render the paginator -->
{#if $serviceStore.current_page > 0}
    <div class="text-center py-2">
        <button
            class="secondary-button-outline"
            class:disabled={!buttonStatus.backward.enabled}
            on:click={() => action(ButtonAction.BACKWARD)}
        >
            <i class="fa-solid fa-backward" />
        </button>
        <button
            class="secondary-button-outline"
            class:disabled={!buttonStatus.previous.enabled}
            on:click={() => action(ButtonAction.PREVIOUS)}
        >
            <i class="fa-solid fa-caret-left" />
        </button>
        <div
            class="inline-flex divide-x divide-gray-300 border rounded mx-5 font-bold text-gray-700"
        >
            {#each numbers as number}
                <button
                    class="px-2 py-1 text-xs"
                    class:active={number === $serviceStore.current_page}
                    on:click={() => go(number)}
                >
                    {number}
                </button>
            {/each}
        </div>
        <button
            class="secondary-button-outline"
            class:disabled={!buttonStatus.next.enabled}
            on:click={() => action(ButtonAction.NEXT)}
        >
            <i class="fa-solid fa-caret-right" />
        </button>
        <button
            class="secondary-button-outline"
            class:disabled={!buttonStatus.forward.enabled}
            on:click={() => action(ButtonAction.FORWARD)}
        >
            <i class="fa-solid fa-forward" />
        </button>
    </div>
{/if}

<style>
    .disabled {
        @apply bg-gray-200 select-none pointer-events-none cursor-not-allowed;
    }

    .active {
        @apply bg-blue-100 select-none pointer-events-none cursor-not-allowed;
    }
</style>
