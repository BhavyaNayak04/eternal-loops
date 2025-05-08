"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeartIcon } from "lucide-react";
import Loader from "../Loader";
import { CustomOrder } from "@/types";
import { getOrdersByUserId } from "@/api/custom/getOrdersByUserId";
import { useAuth } from "@/context/AuthContext";
import { revokeOrder } from "@/api/custom/revokeOrder";

export default function CustomOrders() {
  const { user } = useAuth();
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomOrders = async () => {
      try {
        if (!user) {
          return;
        }
        const response = await getOrdersByUserId(user.userId);
        setCustomOrders(response);
      } catch (error) {
        console.error("Error fetching custom orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomOrders();
  }, [user]);

  const getStatusBadgeClass = (status: CustomOrder["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: CustomOrder["status"]) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const handleRevoke = async (_id: string) => {
    const respone = await revokeOrder(_id);
    if (respone.success) {
      setCustomOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== _id)
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    <Loader />;
  }

  if (customOrders.length === 0) {
    return (
      <div className="py-12 text-center flex flex-col items-center justify-center">
        <HeartIcon className="h-16 w-16 text-rose-500" />
        <h3 className="mt-4 text-xl font-medium text-gray-800">
          No custom orders yet
        </h3>
        <p className="mt-2 text-gray-600">
          Looking for something special? Request a custom crochet item!
        </p>
        <button
          onClick={() => (window.location.href = "/custom")}
          className="mt-6 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
        >
          Request Custom Item
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
        <button
          onClick={() => (window.location.href = "/custom")}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
        >
          New Custom Request
        </button>
      </div>

      <div className="space-y-6">
        {customOrders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <div className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative h-32 w-32 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                  {order.image ? (
                    <Image
                      src={order.image}
                      alt={order.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-rose-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-rose-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">
                      {order.name}
                    </h3>
                    <div className="flex justify-center items-center flex-col gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                      <button
                        onClick={() => handleRevoke(order._id)}
                        className="text-sm text-red-500"
                      >
                        Revoke Order
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-gray-600">{order.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Requested on {formatDate(order.createdAt)}
                    </span>

                    {order.price && (
                      <span className="text-lg font-semibold text-gray-900">
                        ${order.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {order.status === "approved" && (
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          /* Logic to proceed with payment */
                        }}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Tracker */}
            {["pending", "approved", "completed"].includes(order.status) && (
              <div className="px-6 pb-4">
                <div className="relative">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{
                        width:
                          order.status === "pending"
                            ? "25%"
                            : order.status === "approved"
                            ? "50%"
                            : order.status === "completed"
                            ? "100%"
                            : "0%",
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-rose-500"
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span
                      className={
                        order.status === "pending" ||
                        order.status === "approved" ||
                        order.status === "completed"
                          ? "text-rose-600 font-medium"
                          : ""
                      }
                    >
                      Request Received
                    </span>
                    <span
                      className={
                        order.status === "approved" ||
                        order.status === "completed"
                          ? "text-rose-600 font-medium"
                          : ""
                      }
                    >
                      Approved
                    </span>

                    <span
                      className={
                        order.status === "completed"
                          ? "text-rose-600 font-medium"
                          : ""
                      }
                    >
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
