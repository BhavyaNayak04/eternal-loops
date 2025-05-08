"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getTopThreeLiked } from "@/api/likes/getTopThreeLiked";
import Link from "next/link";
import { TopLikedProduct } from "@/api/likes/getTopThreeLiked";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<TopLikedProduct[]>(
    []
  );
  useEffect(() => {
    const fetchTopThreeLiked = async () => {
      try {
        const response = await getTopThreeLiked();
        setFeaturedProducts(response);
      } catch (error) {
        console.error("Error fetching top three liked products:", error);
      }
    };
    fetchTopThreeLiked();
  }, []);

  return (
    <section className="py-16 px-8 bg-rose-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3 text-rose-800">
          Featured Creations
        </h2>
        <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
          Our most loved handmade crochet pieces, crafted with attention to
          every stitch
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((featuredProduct) => (
            <div
              key={featuredProduct.product._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={featuredProduct.product.image}
                  alt={featuredProduct.product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {featuredProduct.product.name}
                  </h3>
                  <span className="text-rose-600 font-bold">
                    {featuredProduct.product.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {featuredProduct.product.description}
                </p>
                <p className="text-gray-600 mb-4">
                  liked by{" "}
                  <span className="text-rose-500">
                    {featuredProduct.likeCount}
                  </span>{" "}
                  {featuredProduct.likeCount > 1 ? `people` : "person"}
                </p>
                <button className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
