"use client";
import { fetchProdcuctDetails } from "@/api/products/getProductDetails";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [productData, setProductData] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const product = await fetchProdcuctDetails(id as string);
        setProductData(product); 
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading product details...</p>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          {error || "Product not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto overflow-hidden mt-20">
      <div className="flex flex-col md:flex-row min-h-screen md:min-h-[600px]">
        <div className="md:w-1/2 flex items-center justify-center p-6">
          <div className="relative w-full h-full max-h-[500px]">
            <Image
              src={productData.image}
              alt={productData.name}
              layout="fill"
              objectFit="contain"
              priority
              className="rounded-md"
            />
          </div>
        </div>

        <div className="md:w-1/2 p-8 flex flex-col">
          <Link
            href="/shop"
            className="flex items-center text-gray-500 hover:text-blue-600 mb-6 text-sm"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Products
          </Link>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {productData.name}
          </h1>

          <div className="text-2xl font-bold text-green-700 mb-4">
            ${productData.price}
          </div>

          {productData.inStock ? (
            <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-md mb-6">
              In Stock
            </span>
          ) : (
            <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-md mb-6">
              Out of Stock
            </span>
          )}

          <p className="text-gray-600 mb-8 leading-relaxed">
            {productData.description}
          </p>

          <div className="space-y-2 mb-8">
            <div className="flex">
              <span className="text-gray-600 font-medium w-24">Category:</span>
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                {productData.tag}
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-600 font-medium w-24">
                Product ID:
              </span>
              <span className="text-gray-500 text-sm">{productData._id}</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-medium mb-2"
            >
              Quantity:
            </label>
            <div className="flex items-center w-32">
              <button
                className="w-10 h-10 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-l-md hover:bg-gray-200"
                onClick={decrementQuantity}
              >
                <Minus size={16} />
              </button>
              <input
                type="text"
                id="quantity"
                className="w-12 h-10 border-t border-b border-gray-300 text-center"
                value={quantity}
                readOnly
              />
              <button
                className="w-10 h-10 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-r-md hover:bg-gray-200"
                onClick={incrementQuantity}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-auto">
            <button
              className="flex-grow py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              disabled={!productData.inStock}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
            <button className="py-3 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
