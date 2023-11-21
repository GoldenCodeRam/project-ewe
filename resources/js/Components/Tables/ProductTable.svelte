<script lang="ts">
    import {
        createSvelteTable,
        type ColumnDef,
        getCoreRowModel,
        type TableOptions,
        flexRender,
        getFilteredRowModel,
        type ColumnSort,
    } from "@tanstack/svelte-table";
    import { fade } from "svelte/transition";
    import { writable } from "svelte/store";
    import type { Product } from "../../Types/Types";
    import {
        createProductService,
    } from "../../Functions/Services/ProductService";
    import Paginator from "../Paginator.svelte";

    let sorting: any[] = [];

    const productService = createProductService();
    const serviceStore = productService.service.store;
    const serviceLoadingStore = productService.service.loadingStore;

    const columns: ColumnDef<Product>[] = [
        {
            id: "name",
            header: "Nombre",
            accessorFn: (data) => data.name,
            cell: (info) => info.getValue(),
        },
        {
            id: "value",
            header: "Valor",
            accessorFn: (data) => data.value,
            cell: (info) => info.getValue(),
        },
    ];
    const options = writable<TableOptions<Product>>({
        data: $serviceStore.data,
        columns: columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        debugTable: true,
    });
    const table = createSvelteTable(options);

    function setSorting(updater: any) {
        if (updater instanceof Function) {
            sorting = updater(sorting);
        } else {
            sorting = updater;
        }

        $options = {
            ...$options,
            state: {
                ...$options.state,
                sorting,
            },
        };

        // Update ProductService sorting store and get the information.
        productService.service.sortingStore.update((store) => {
            store.sort = sorting;
            return store;
        });
        productService.service.get();
    }

    $: $options.data = $serviceStore.data;

    productService.service.get();
</script>

<div class="p-8 h-full w-full">
    <div
        class="p-4 bg-white rounded shadow relative h-full w-full overflow-auto"
    >
        <!-- Loading indicator -->
        {#if $serviceLoadingStore.isLoading}
            <div
                transition:fade
                class="bg-white/80 absolute w-full h-full top-0 left-0 flex items-center justify-center"
            >
                Cargando productos...
            </div>
        {/if}

        <!-- If the data is empty but it's not loading -->
        {#if $serviceStore.data.length === 0 && !$serviceLoadingStore.isLoading}
            <div
                class="flex flex-col justify-center items-center h-full text-gray-400"
            >
                <i class="fa-solid fa-box-open text-8xl" />
                <h1>Sin productos</h1>
            </div>
        {:else}
            <h1 class="text-xl font-bold text-center">Lista de Productos</h1>

            <table class="table-fixed border w-full">
                <thead>
                    {#each $table.getHeaderGroups() as headerGroup}
                        <tr>
                            {#each headerGroup.headers as header}
                                <th>
                                    {#if !header.isPlaceholder}
                                        <div
                                            class:cursor-pointer={header.column.getCanSort()}
                                            class:select-none={header.column.getCanSort()}
                                            on:click={header.column.getToggleSortingHandler()}
                                            class="flex justify-center items-center"
                                        >
                                            <svelte:component
                                                this={flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                            />
                                            {#if header.column
                                                .getIsSorted()
                                                .toString() === "asc"}
                                                <i
                                                    class="ms-2 fa-solid fa-sort-up"
                                                />
                                            {:else if header.column
                                                .getIsSorted()
                                                .toString() === "desc"}
                                                <i
                                                    class="ms-2 fa-solid fa-sort-down"
                                                />
                                            {/if}
                                        </div>
                                    {/if}
                                </th>
                            {/each}
                        </tr>
                    {/each}
                </thead>
                <tbody>
                    {#each $table.getRowModel().rows as row}
                        <tr>
                            {#each row.getVisibleCells() as cell}
                                <td>
                                    <svelte:component
                                        this={flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    />
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
                <tfoot>
                    {#each $table.getFooterGroups() as footerGroup}
                        <tr>
                            {#each footerGroup.headers as header}
                                <th>
                                    {#if !header.isPlaceholder}
                                        <svelte:component
                                            this={flexRender(
                                                header.column.columnDef.footer,
                                                header.getContext()
                                            )}
                                        />
                                    {/if}
                                </th>
                            {/each}
                        </tr>
                    {/each}
                </tfoot>
            </table>
            <Paginator service={productService.paginationService} />
        {/if}
    </div>
</div>
