"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import Loader from "../Loader";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export default function LikedProducts() {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const response = await fetch("/api/user/liked-products");
        if (!response.ok) {
          throw new Error("Failed to fetch liked products");
        }
        const data = await response.json();
        setLikedProducts(data.products);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, []);

  const removeFromLiked = async (productId: string) => {
    try {
      const response = await fetch(`/api/user/liked-products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from liked");
      }

      setLikedProducts(
        likedProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error removing product from liked:", error);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      // Show success notification or modal here
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (loading) {
    <Loader />;
  }

  if (likedProducts.length === 0) {
    return (
      <div className="py-12 text-center flex flex-col items-center justify-center">
        <HeartIcon className="h-16 w-16 text-rose-400" />
        <h3 className="mt-4 text-xl font-medium text-gray-800">
          No liked products yet
        </h3>
        <p className="mt-2 text-gray-600">Products you like will appear here</p>
        <Link
          href="/shop"
          className="mt-6 inline-block px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Products You Like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedProducts.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
          >
            <div className="relative h-64 w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => removeFromLiked(product._id)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-rose-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <Link href={`/product/${product._id}`} className="block">
                <h3 className="text-lg font-medium text-gray-900 hover:text-rose-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="mt-1 text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-md transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/cart"
          className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Proceed to Cart
        </Link>
      </div>
    </div>
  );
}
