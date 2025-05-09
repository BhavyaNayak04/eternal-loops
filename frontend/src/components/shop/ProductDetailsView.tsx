"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Truck,
  Clock,
} from "lucide-react";
import Link from "next/link";
import addToCart from "@/api/cart/addToCart";
import { toggleLike } from "@/api/likes/toggleLike";
import { Product } from "@/utils/types";
import { getLikesCount } from "@/api/likes/getLikesCount";

export default function ProductDetailsView({
  productData,
  maxQuantity,
  productId,
  userId,
  like,
}: {
  productData: Product;
  maxQuantity: number;
  productId: string;
  userId: string;
  like: boolean | undefined;
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(like);
  const [likesCount, setLikesCount] = useState(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      const response = await getLikesCount(productId);
      setLikesCount(response);
    };
    fetchWishlistStatus();
  }, [productId]);

  const incrementQuantity = () => {
    setQuantity((prev) => (prev < maxQuantity ? prev + 1 : prev));
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    if (!userId) {
      setIsAddingToCart(false);
      return;
    }
    const response = await addToCart(userId, productId, quantity);
    if (response.success) {
      setIsAddingToCart(false);
      setMessage("Added to cart successfully!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      setIsAddingToCart(false);
      setMessage(response.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const toggleWishlist = async () => {
    const response = await toggleLike(
      userId,
      productId,
      isLiked ? "unlike" : "like"
    );
    if (response.success) {
      setMessage(response.message);
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      setMessage("Failed to update like");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Shop
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/5">
          <div className="bg-gray-50 rounded-lg p-4 overflow-hidden">
            <div className="relative aspect-square w-full">
              <Image
                src={productData.image}
                alt={productData.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="lg:w-3/5 flex flex-col">
          <div className="mb-4">
            <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
              {productData.tag}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {productData.name}
            </h1>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-gray-900">
              Rs.{productData.price}
            </div>
            <div className="flex items-center">
              <div className="flex">
                <Heart size={16} color="red" />
              </div>
              <span className="ml-2 text-xs text-gray-500">
                liked by {likesCount}
              </span>
            </div>
          </div>

          <div className="mb-4">
            {productData.inStock ? (
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium text-sm">In Stock</span>
                <span className="ml-2 text-xs text-gray-500">
                  {maxQuantity > 10
                    ? "Plenty available"
                    : `Only ${maxQuantity} left`}
                </span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <span className="font-medium text-sm">Out of Stock</span>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {productData.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-3 flex-1">
              <div className="flex items-center">
                <Truck size={14} className="text-blue-700 mr-2" />
                <span className="font-medium text-sm text-gray-800">
                  Free shipping
                </span>
              </div>
              <div className="flex items-center mt-1">
                <Clock size={14} className="text-blue-700 mr-2" />
                <span className="text-xs text-gray-600">
                  Delivery: 2-5 days
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 flex-1">
              <div className="text-xs text-gray-500">
                Product ID: <span className="font-mono">{productData._id}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-xs text-gray-700 font-medium mb-1"
            >
              Quantity:
            </label>
            <div className="flex items-center">
              <button
                className="w-8 h-8 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-l-md hover:bg-gray-200 transition-colors"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus
                  size={14}
                  className={quantity <= 1 ? "text-gray-400" : "text-gray-700"}
                />
              </button>
              <input
                type="text"
                id="quantity"
                className="w-10 h-8 border-t border-b border-gray-300 text-center text-sm font-medium"
                value={quantity}
                readOnly
              />
              <button
                className="w-8 h-8 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-r-md hover:bg-gray-200 transition-colors"
                onClick={incrementQuantity}
                disabled={quantity >= maxQuantity}
              >
                <Plus
                  size={14}
                  className={
                    quantity >= maxQuantity ? "text-gray-400" : "text-gray-700"
                  }
                />
              </button>

              <span className="ml-2 text-xs text-gray-500">
                {maxQuantity > 0 ? `Max: ${maxQuantity}` : "Out of stock"}
              </span>
            </div>
          </div>

          <div className="flex space-x-3 mt-2">
            <button
              className={`flex-grow py-3 px-4 rounded-md font-semibold text-white transition-all flex items-center justify-center ${
                productData.inStock
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!productData.inStock || isAddingToCart}
              onClick={handleAddToCart}
            >
              {isAddingToCart ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </>
              )}
            </button>
            <button
              className={`py-3 px-3 border rounded-md transition-all ${
                isLiked
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={toggleWishlist}
            >
              <Heart
                size={18}
                className={isLiked ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>
          <p className="flex justify-center items-center w-full mt-3 text-gray-400">
            {message}
          </p>
        </div>
      </div>
    </>
  );
}
