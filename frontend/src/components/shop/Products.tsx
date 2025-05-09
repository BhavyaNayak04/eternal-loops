// Product.tsx
import addToCart from "@/api/cart/addToCart";
import { Product } from "@/utils/types";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Products({
  sortedProducts,
  user,
}: {
  sortedProducts: Product[];
  user: { userId: string; token: string } | null;
}) {
  const [message, setMessage] = useState("");
  const handleCart = async (id: string) => {
    if (!user) return;
    const response = await addToCart(user.userId, id, 1);
    if (response.success) {
      setMessage(response.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setMessage(response.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  if (sortedProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }
  return (
    <>
      {message && (
        <p className="fixed top-20 right-2 z-50 bg-white px-4 py-2 rounded shadow-md text-gray-800">
          {message}
        </p>
      )}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full"
            >
              {/* Fixed height image container */}
              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition-transform hover:scale-105 object-cover"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {!product.inStock && (
                    <div className="bg-gray-800 text-white px-3 py-1 rounded-md text-xs font-medium">
                      Out of Stock
                    </div>
                  )}
                  {product.isLiked && (
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <Heart size={16} fill="red" color="red" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content container with fixed height */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="text-rose-600 font-bold text-lg whitespace-nowrap">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.tag.charAt(0).toUpperCase() + product.tag.slice(1)}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Action buttons always aligned to bottom */}
                <div className="flex gap-3 mt-auto">
                  <button
                    className={`flex-1 py-3 rounded-lg transition-colors text-sm font-medium
                      ${
                        product.inStock
                          ? "bg-rose-600 hover:bg-rose-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    disabled={!product.inStock}
                    onClick={() => handleCart(product._id)}
                  >
                    {product.inStock ? "Add to Cart" : "Sold Out"}
                  </button>
                  <Link
                    href={`/shop/${product._id}`}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <Eye />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
