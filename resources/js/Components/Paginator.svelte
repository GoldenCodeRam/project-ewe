<script lang="ts">
    import type { Pagination } from "../Types/Types";
    import { createEventDispatcher } from "svelte";

    enum ButtonAction {
        NEXT,
        PREVIOUS,
        BACKWARD,
        FORWARD,
    }

    export let paginationData: Pagination | undefined;

    const dispatch = createEventDispatcher();
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
        if (paginationData) {
            const start = Math.max(
                1,
                Math.ceil(currentPage - PAGINATOR_SIZE / 2)
            );
            const end = Math.min(
                paginationData.total / paginationData.per_page,
                Math.floor(currentPage + PAGINATOR_SIZE / 2)
            );
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }
        return [];
    }

    function getTotalPages(): number {
        if (paginationData) {
            return paginationData.total / paginationData.per_page;
        }
        return 0;
    }

    function go(pageNumber: number) {
        dispatch("go", pageNumber);
    }

    function action(buttonAction: ButtonAction) {
        if (paginationData) {
            switch (buttonAction) {
                case ButtonAction.NEXT:
                    return dispatch("next", paginationData.current_page + 1);
                case ButtonAction.PREVIOUS:
                    return dispatch(
                        "previous",
                        paginationData.current_page - 1
                    );
                case ButtonAction.BACKWARD:
                    return dispatch("backward", 1);
                case ButtonAction.FORWARD:
                    return dispatch("forward", getTotalPages());
                default:
                    throw Error("ButtonAction not registered!");
            }
        }
    }

    $: {
        if (paginationData) {
            buttonStatus.forward.enabled =
                paginationData.current_page < getTotalPages();
            buttonStatus.backward.enabled = paginationData.current_page > 1;
            buttonStatus.next.enabled = paginationData.next_page_url
                ? true
                : false;
            buttonStatus.previous.enabled = paginationData.prev_page_url
                ? true
                : false;

            numbers = getPaginationNumbers(paginationData.current_page);
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
    {paginationData?.current_page} from {getTotalPages()}
</div>

<style>
    .disabled {
        @apply bg-red-100;
    }
</style>
