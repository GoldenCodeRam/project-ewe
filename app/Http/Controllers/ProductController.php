<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query();
        $query->with("category");
        $query->with("images");

        $parameters = $request->query->all();

        foreach($parameters as $key => $value) {
            switch ($key) {
                // TODO: This should be its own method.
                // TODO: This should have a way to verify that the columns
                // requested exists on the table.
                case "sort":
                    foreach($value as $sorting) {
                        $query->orderBy(
                            $sorting["id"],
                            filter_var($sorting["desc"], FILTER_VALIDATE_BOOLEAN) ? "desc" : "asc"
                        );
                    }
                    break;
                case "category":
                    $query->where("product_category_id", $value);
                    break;
            }
        }

        // If the query doesn't has any other parameter, return all the
        // products.
        return $query->paginate(config('pagination_default_amount', 20));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        Product::create($request->all());
        return redirect(status: 202)->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $uuid): Product | null
    {
        return Product::query()
            ->where("uuid", $uuid)
            ->with("category")
            ->with("images")
            ->first();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
