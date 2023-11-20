<script lang="ts">
    import type { HasPagination, Service } from "../Functions/Services/Service";
    import type { PaginatedResponse } from "../Types/Types";

    enum ButtonAction {
        NEXT,
        PREVIOUS,
        BACKWARD,
        FORWARD,
    }

    export let service: Service<PaginatedResponse> & HasPagination;
    const serviceStore = service.store;

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
            return $serviceStore.total / $serviceStore.per_page;
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
                case ButtonAction.PREVIOUS:
                case ButtonAction.BACKWARD:
                case ButtonAction.FORWARD:
                default:
                    throw Error("ButtonAction not registered!");
            }
        }
    }

    $: {
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

<div>
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
    {#each numbers as number}
        <button class="secondary-button-outline" on:click={() => go(number)}>
            {number}
        </button>
    {/each}
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

<style>
    .disabled {
        @apply bg-red-100;
    }
</style>
