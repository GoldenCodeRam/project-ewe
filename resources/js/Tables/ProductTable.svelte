<script lang="ts">
    import {
        createSvelteTable,
        type ColumnDef,
        getCoreRowModel,
        type TableOptions,
        flexRender,
        getSortedRowModel,
        getPaginationRowModel,
        getFilteredRowModel,
    } from "@tanstack/svelte-table";
    import { fade } from "svelte/transition";
    import { writable } from "svelte/store";
    import type { Product } from "../Types/Types";
    import { ProductService } from "../Functions/Services/CreateProductService";

    const defaultData: Product[] = [];
    const service: ProductService = new ProductService(3000);

    let isLoading: boolean = false;

    async function updateTable() {
        isLoading = true;
        const response = await service.get();
        isLoading = false;

        $options.data = response.data;
    }

    const columns: ColumnDef<Product>[] = [
        {
            id: "name",
            accessorFn: (data) => data.name,
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        },
        {
            id: "value",
            accessorFn: (data) => data.value,
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        },
    ];

    let sorting: any[] = [];

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

        // Update sorted value
        updateTable();
    }

    const options = writable<TableOptions<Product>>({
        data: defaultData,
        columns: columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualSorting: true,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    const table = createSvelteTable(options);

    // At start, load all the data.
    updateTable();
</script>

<div class="p-8 h-full w-full">
    <div
        class="p-4 bg-white rounded shadow relative h-full w-full overflow-auto"
    >
        <!-- Loading indicator -->
        {#if isLoading}
            <div
                transition:fade
                class="bg-white/80 absolute w-full h-full top-0 left-0 flex items-center justify-center"
            >
                Cargando productos...
            </div>
        {/if}

        <h1 class="text-xl font-bold text-center">Lista de Productos</h1>

        <table class="table-auto border w-full">
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
                                    >
                                        <svelte:component
                                            this={flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        />
                                        {{
                                            asc: " 🔼",
                                            desc: " 🔽",
                                        }[
                                            header.column
                                                .getIsSorted()
                                                .toString()
                                        ] ?? ""}
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

        <div class="h-2" />
        <div class="flex items-center gap-2">
            <button
                class="border rounded p-1"
                on:click={() => $table.setPageIndex(0)}
                disabled={!$table.getCanPreviousPage()}
            >
                {"<<"}
            </button>
            <button
                class="border rounded p-1"
                on:click={() => $table.previousPage()}
                disabled={!$table.getCanPreviousPage()}
            >
                {"<"}
            </button>
            <button
                class="border rounded p-1"
                on:click={() => $table.nextPage()}
                disabled={!$table.getCanNextPage()}
            >
                {">"}
            </button>
            <button
                class="border rounded p-1"
                on:click={() => $table.setPageIndex($table.getPageCount() - 1)}
                disabled={!$table.getCanNextPage()}
            >
                {">>"}
            </button>
            <span class="flex items-center gap-1">
                <div>Page</div>
                <strong>
                    {$table.getState().pagination.pageIndex + 1} of{" "}
                    {$table.getPageCount()}
                </strong>
            </span>
        </div>
        <div>{$table.getRowModel().rows.length} Rows</div>
        <pre>{JSON.stringify($table.getState().pagination, null, 2)}</pre>
    </div>
</div>
