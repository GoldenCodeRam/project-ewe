<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductCategoryRequest;
use App\Models\ProductCategory;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): LengthAwarePaginator
    {
        $query = ProductCategory::query();
        return $query->paginate(config('pagination_default_amount', 20));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductCategoryRequest $request): RedirectResponse
    {
        ProductCategory::create($request->all());
        return redirect(status: 202)->back();
    }

    /**
     * Display the specified resource.
     *
     * @return array<string,mixed>
     */
    public function show(string $id): array
    {
        /**
         * @var ProductCategory
         */
        $productCategory = ProductCategory::query()
            ->where("id", $id)
            ->first();

        // TODO: This might have to change in the future, as we might not want
        // to return every time the products of the category when requested.
        return [
            "product_category" => $productCategory,
            "products" => $productCategory
                ->products()
                ->paginate(config("pagination_default_amount", 20)),
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): void
    {
        //
    }
}
