<script lang="ts">
    import { computePosition, shift } from "@floating-ui/dom";
    import { fade } from "svelte/transition";

    let props = {
        class: $$restProps.class,
    };

    let button: HTMLButtonElement;
    let dropdown: HTMLDivElement;
    let isDropdownOpen = false;

    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }

    function setPosition(node: HTMLDivElement) {
        computePosition(button, node, {
            placement: "bottom",
            middleware: [shift()],
        }).then(({ x, y }) => {
            Object.assign(node.style, {
                top: `${y}px`,
                left: `${x}px`,
            });
        });
    }

    function hideDropdown() {
        isDropdownOpen = false;
    }

    function dropdownFocusLost(event: MouseEvent) {
        if (dropdown) {
            if (
                event.target instanceof HTMLElement &&
                dropdown.contains(event.target)
            ) {
                return;
            }
        }
        hideDropdown();
    }

    // I feel this can be error prone. But I haven't found a better way of
    // doing this.
    $: if (isDropdownOpen) {
        document.addEventListener("click", dropdownFocusLost);
    } else {
        document.removeEventListener("click", dropdownFocusLost);
    }
</script>

<button
    bind:this={button}
    on:click|stopPropagation={toggleDropdown}
    class={props.class}
    type="button"
>
    <slot name="button" />
</button>

{#if isDropdownOpen}
    <div
        bind:this={dropdown}
        use:setPosition
        class="absolute z-10"
        transition:fade={{ duration: 100 }}
    >
        <slot name="dropdown" />
    </div>
{/if}
