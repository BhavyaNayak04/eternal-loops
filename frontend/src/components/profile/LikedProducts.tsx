"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import Loader from "../Loader";
import { getAllLikedProducts } from "@/api/likes/getAllLikedProducts";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/types";
import addToCart from "@/api/cart/addToCart";

export default function LikedProducts() {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const response = await getAllLikedProducts(user?.userId as string);
        if (response.length === 0) {
          setLoading(false);
          return;
        }

        setLikedProducts(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, [user?.userId]);

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

  const handleCart = async (productId: string) => {
    try {
      if (!user) {
        return;
      }
      const response = await addToCart(user.userId, productId, 1);
      setMessage(response.message);
      setTimeout(() => {
        setMessage("");
      }, 1000);
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
      {message && (
        <p className="fixed top-20 right-2 z-50 bg-white px-4 py-2 rounded shadow-md text-gray-800">
          {message}
        </p>
      )}
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
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => removeFromLiked(product._id)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-rose-100"
              >
                <HeartIcon className="h-6 w-6 text-rose-600" />
              </button>
            </div>

            <div className="p-4">
              <Link href={`/shop/${product._id}`} className="block">
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
                  onClick={() => handleCart(product._id)}
                  className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-md transition-colors flex items-center"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-3" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
