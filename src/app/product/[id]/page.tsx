"use client";
import { use } from "react"; // Import React `use` for promise unwrapping
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ShoppingCart, Star, User } from "lucide-react";
import { products } from "@/lib/data/products"; // Import products
import { reviews } from "@/lib/data/reviews"; // Import reviews

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Unwrap the params promise to access `id`
  const product = products.find((p) => p?.id === id);
  const productReviews = reviews.filter((r) => r.productId === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <Header
        searchQuery=""
        setSearchQuery={() => {}}
        selectedCategory="all"
        setSelectedCategory={() => {}}
        selectedSubCategory=""
        setSelectedSubCategory={() => {}}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-[#333333] rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-lg">Product Image</span>
          </div>

          {/* Product Details */}
          <div>
            {/* Product Name */}
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            {/* Creator */}
            <p className="text-gray-400 text-sm mb-6">
              Created by <span className="text-white">{product.creator}</span>
            </p>
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating
                        ? "text-white fill-white"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              <span className="text-sm text-gray-300">
                {product.rating.toFixed(1)} / 5
              </span>
            </div>
            {/* Price */}
            <p className="text-3xl font-bold mb-6">
              ${product.price.toFixed(2)}
            </p>
            {/* Description */}
            <p className="text-gray-300 mb-6">{product.description}</p>
            {/* Add to Cart Button */}
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md flex items-center justify-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {productReviews.length > 0 ? (
            <ul className="space-y-4">
              {productReviews.map((review, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 bg-[#222222] p-4 rounded-lg"
                >
                  <User className="h-8 w-8 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {review.user}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array(review.rating)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-white text-white"
                          />
                        ))}
                    </div>
                    <p className="text-gray-300 mt-2">{review.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No reviews yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}
