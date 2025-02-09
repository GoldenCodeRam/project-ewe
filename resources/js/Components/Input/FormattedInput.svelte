<script lang="ts">
    import { COPFormatter } from "../../Functions/Formatter";
    import { fade } from "svelte/transition";

    const props = {
        type: $$props.type,
    };

    export let id: string;
    export let label: string;
    export let placeholder: string = "";

    export let errors: string[] | undefined;
    export let realValue: string | undefined;

    const baseClass =
        "flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md";
    $: errorClass =
        errors && errors.length > 0
            ? "bg-red-50 ring-red-400"
            : " focus-within:ring-gray-600";

    /**
     * Heavily inspired by this [REPL](https://svelte.dev/repl/f45d38ec017749ddbcb86310d1102f82?version=3.46.4)
     * I tried to change it to the best of my abilities to be a little bit
     * modular.
     *
     * Checks that the <beforeInput> event is valid for the Input. The validation
     * is done by some formatting rule. If it follows the rule, the input is
     * updated as spected, if not, the input is ignored.
     *
     * @param event <beforeInput> event.
     */
    function validate(event: any) {
        const { inputType, data, target } = event;
        const { value, selectionStart, selectionEnd } = target;

        // We have how the data will be changed, so lets calculate the next
        // value of the input field.
        let nextValue;
        let beginning = value.slice(0, selectionStart);
        let ending = value.slice(selectionEnd);

        if (inputType.startsWith("insert")) {
            nextValue = beginning + data + ending;
        } else if (inputType.startsWith("delete")) {
            if (selectionStart !== selectionEnd) {
                nextValue = beginning + ending;
            } else {
                switch (event.inputType) {
                    case "deleteWordBackward":
                        beginning = beginning.replace(/(\w+|\W)\s*$/, "");
                        break;
                    case "deleteWordForward":
                        ending = ending.replace(/^\s*(\w+|\W)/, "");
                        break;
                    case "deleteSoftLineBackward":
                    case "deleteHardLineBackward":
                        beginning = "";
                        break;
                    case "deleteSoftLineForward":
                    case "deleteHardLineForward":
                        ending = "";
                        break;
                    case "deleteEntireSoftLine":
                        beginning = "";
                        ending = "";
                        break;
                    case "deleteByDrag":
                    case "deleteByCut":
                    case "deleteContent":
                        // Handled by if branch
                        break;
                    case "deleteContentBackward":
                        beginning = beginning.slice(0, -1);
                        break;
                    case "deleteContentForward":
                        ending = ending.slice(1);
                        break;
                    default:
                        console.warn(
                            `Unknown input deletion type: ${inputType}`
                        );
                }
                nextValue = beginning + ending;
            }
        }

        // In case we need just to validate the input, just call preventDefault
        // for validation. For formatting, we need to cancel the input to avoid
        // merging the user changes and the formatting changes.
        // Also, fire an input event to notify Svelte about changes.
        event.preventDefault();

        // Check if the string real value is greater than 0, if it is, remove
        // all content.
        // TODO: Should move this from here, as it is the final modular
        // validation.
        if (COPFormatter.toRealValue(nextValue).length > 0) {
            const format = COPFormatter.toFormattedValue(nextValue);
            if (format) {
                event.target.value = COPFormatter.toFormattedValue(nextValue);
                realValue = COPFormatter.toRealValue(nextValue);

                const newDataLength =
                    COPFormatter.toFormattedValue(beginning + (data ?? ""))
                        ?.length ?? 0;

                target.selectionStart = newDataLength;
                target.selectionEnd = newDataLength;
            }
        } else {
            event.target.value = "";
        }

        event.target.dispatchEvent(new InputEvent("input", event));
    }
</script>

<div class="mx-auto">
    <label for={id} class="block text-sm font-medium leading-6 text-gray-900">
        {label ?? id}
    </label>
    <div class="{baseClass} {errorClass}">
        <!-- Main component -->
        <input
            {id}
            class="outline-none block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            autocomplete="off"
            on:beforeinput={validate}
            {placeholder}
            {...props}
        />

        {#if errors && errors.length > 0}
            <div transition:fade>
                <i class="fa-solid fa-circle-exclamation text-red-500 px-2" />
            </div>
        {/if}
    </div>
    {#if errors && errors.length > 0}
        <div transition:fade>
            <p class="text-sm text-red-900">{errors}</p>
        </div>
    {/if}
</div>
