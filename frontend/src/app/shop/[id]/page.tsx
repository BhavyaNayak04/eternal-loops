"use client";
import { fetchProdcuctDetails } from "@/api/products/getProductDetails";
import { fetchProductStock } from "@/api/products/getProductStock";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { Info } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";
import SimilarProducts from "@/components/shop/SimilarProducts";
import { useAuth } from "@/context/AuthContext";
import ProductDetailsView from "@/components/shop/ProductDetailsView";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [productData, setProductData] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [maxQuantity, setMaxQuantity] = useState(10);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (!id || !user) return;
      try {
        const product = await fetchProdcuctDetails(id as string, user.userId);
        setProductData(product);
        const stockData = await fetchProductStock(id as string);
        setMaxQuantity(stockData.stock || 10);
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
  }, [id, user]);

  if (!user || !id) return;

  if (loading) {
    return <Loader />;
  }

  if (error || !productData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
            <Info className="text-red-500" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
            Product Not Found
          </h3>
          <p className="text-gray-600 text-center mb-4">
            {error || "We couldn't find the product you're looking for."}
          </p>
          <Link href="/shop">
            <div className="w-full py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-all text-center">
              Continue Shopping
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-16">
      <ProductDetailsView
        productData={productData}
        maxQuantity={maxQuantity}
        productId={id as string}
        userId={user.userId}
        like={productData.isLiked}
      />
      <SimilarProducts tag={productData.tag} />
    </div>
  );
}
