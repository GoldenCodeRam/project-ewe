<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Product::all() as $product) {
            ProductImage::factory()->create([
                "url" => fake()->imageUrl(360, 360, $product->name, true),
                "product_id" => $product->id,
            ]);
        }
    }
}
