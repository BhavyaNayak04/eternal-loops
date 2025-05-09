"use client";
import { useState } from "react";
import ProductsTab from "@/components/admin/ProductsTab";
import CustomOrdersTab from "@/components/admin/CustomOrdersTab";
import OrdersTab from "@/components/admin/OrdersTab";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="bg-pink-600 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">
            Crochet Admin Dashboard
          </h1>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex border-b border-pink-300">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "products"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-600 hover:text-pink-500"
            }`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "customOrders"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-600 hover:text-pink-500"
            }`}
            onClick={() => setActiveTab("customOrders")}
          >
            Custom Orders
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "orders"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-600 hover:text-pink-500"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "customOrders" && <CustomOrdersTab />}
          {activeTab === "orders" && <OrdersTab />}
        </div>
      </div>
    </div>
  );
}
