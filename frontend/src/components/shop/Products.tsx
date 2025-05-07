// Product.tsx
import { Product } from "@/types/index";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetails({
  sortedProducts,
}: {
  sortedProducts: Product[];
}) {
  if (sortedProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }
  return (
    <>
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
                {!product.inStock && (
                  <div className="absolute top-3 right-3 bg-gray-800 text-white px-3 py-1 rounded-md text-xs font-medium">
                    Out of Stock
                  </div>
                )}
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
                  >
                    {product.inStock ? "Add to Cart" : "Sold Out"}
                  </button>
                  <Link
                    href={`/shop/${product._id}`}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
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
