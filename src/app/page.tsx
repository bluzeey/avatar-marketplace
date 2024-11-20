"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { products as allProducts, Product } from "@/lib/data/products";
import { Header } from "@/components/header";

export default function Marketplace() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  // Filtered products
  const filteredProducts = allProducts.filter((product: Product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSubCategory =
      !selectedSubCategory || product.subcategory === selectedSubCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory} // Pass subcategory state to Header
      />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="text-white text-lg font-bold">
          <span className="text-white text-3xl">Parent category</span>
          <span className="mx-2 text-white">&gt;</span>
          <span className="text-white text-3xl">Child category</span>
        </nav>
      </div>

      {/* Product Grid */}
      <main className="container mx-auto px-4 pb-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image Placeholder */}
                  <div className="aspect-square bg-[#333333] flex items-center justify-center text-gray-400">
                    <span className="text-sm">{product.category}</span>
                  </div>
                  {/* Product Info */}
                  <div className="pt-4">
                    {/* Product Name */}
                    <h3 className="text-base font-semibold text-white">
                      {product.name}
                    </h3>
                    {/* Creator */}
                    <p className="text-xs text-gray-400">{product.creator}</p>
                    {/* Ratings */}
                    <div className="mt-2 flex items-center gap-1">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < product.rating
                                ? "text-white fill-white"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      <span className="ml-1 text-sm text-white">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    {/* Price */}
                    <div className="mt-2 text-lg font-bold text-white">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No products found.</p>
        )}
      </main>
    </div>
  );
}
