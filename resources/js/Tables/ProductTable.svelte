<script lang="ts">
    import {
        createSvelteTable,
        type ColumnDef,
        getCoreRowModel,
        type TableOptions,
        flexRender,
        getFilteredRowModel,
        type ColumnSort,
        type Table,
    } from "@tanstack/svelte-table";
    import { fade } from "svelte/transition";
    import { writable, type Readable } from "svelte/store";
    import type { PaginatedResponse, Product } from "../Types/Types";
    import { ProductService } from "../Functions/Services/ProductService";

    let isLoading: boolean = false;
    let sorting: any[] = [];

    const defaultData: Product[] = [];
    const service: ProductService = new ProductService();
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
        data: defaultData,
        columns: columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        debugTable: true,
    });
    const table = createSvelteTable(options);

    async function updateTable(
        sort?: ColumnSort[]
    ) {
        const response = await service.get({
            sort,
        });
        isLoading = false;

        console.log(response.data);
        // As the information comes paginated, we need:
        // The data of the query -> the data of the pagination.
        $options.data = response.data.data;
    }

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
        updateTable($options.state?.sorting);
    }

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
                                                header.column.columnDef.header,
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
