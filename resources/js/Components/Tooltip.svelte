<script lang="ts">
    import { computePosition, offset, flip, shift } from "@floating-ui/dom";
    import { fade } from "svelte/transition";
    import { Debouncer } from "../Functions/Debouncer";

    const debouncer = new Debouncer();

    let showingTooltip: boolean = false;
    let virtualMouseElement = getVirtualMouseElement();

    let tooltip: HTMLDivElement;

    function hasTooltip(event: MouseEvent) {
        virtualMouseElement = getVirtualMouseElement(event);

        if (tooltip) {
            computeTooltipPosition();
        }
    }

    function showTooltip(event: MouseEvent) {
        virtualMouseElement = getVirtualMouseElement(event);
        debouncer.debounce(() => {
            showingTooltip = true;
        })();
    }

    function hideTooltip() {
        debouncer.stopTimeout();
        showingTooltip = false;
    }

    function getVirtualMouseElement(event?: MouseEvent) {
        return {
            getBoundingClientRect() {
                return {
                    width: 0,
                    height: 0,
                    x: event ? event.clientX : 0,
                    y: event ? event.clientY : 0,
                    left: event ? event.clientX : 0,
                    right: event ? event.clientX : 0,
                    top: event ? event.clientY : 0,
                    bottom: event ? event.clientY : 0,
                };
            },
        };
    }

    function computeTooltipPosition(element: any = null) {
        computePosition(virtualMouseElement, tooltip ?? element, {
            placement: "right-start",
            middleware: [offset(15), flip(), shift()],
        }).then(({ x, y }) => {
            Object.assign(tooltip.style, {
                top: `${y}px`,
                left: `${x}px`,
            });
        });
    }
</script>

{#if showingTooltip}
    <div
        transition:fade
        use:computeTooltipPosition
        bind:this={tooltip}
        id="tooltip"
        role="tooltip"
        class="z-40 ring-2 ring-offset-2 bg-gray-700 text-white p-1 rounded-sm w-max absolute top-0 left-0 pointer-events-none"
    >
        <slot name="tooltip" />
    </div>
{/if}

<div
    on:pointerover={showTooltip}
    on:pointermove={hasTooltip}
    on:pointerleave={hideTooltip}
    on:pointerdown={hideTooltip}
    on:focusout={hideTooltip}
    class="inline-block"
>
    <slot />
</div>
