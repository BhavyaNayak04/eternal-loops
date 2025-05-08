import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "../Loader";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

interface PastOrder {
  _id: string;
  product: {
    name: string;
    description: string;
    image: string;
    price: number;
  };
  deliveredDate: string;
}

export default function PastOrders() {
  const [orders, setOrders] = useState<PastOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPastOrders = async () => {
      try {
        const response = await fetch("/api/orders/past", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch past orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastOrders();
  }, []);

  if (loading) {
    <Loader />;
  }

  if (orders.length === 0) {
    return (
      <div className="py-12 text-center flex flex-col items-center justify-center">
        <HeartIcon className="h-16 w-16 text-rose-500" />
        <h3 className="mt-4 text-xl font-medium text-gray-800">
          No past orders yet
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
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Past Orders</h2>
      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg"
          >
            <Image
              height={96}
              width={96}
              src={order.product.image}
              alt={order.product.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {order.product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {order.product.description}
              </p>
              <p className="text-sm text-gray-500">
                Delivered on:{" "}
                <span className="font-medium text-gray-700">
                  {new Date(order.deliveredDate).toLocaleDateString()}
                </span>
              </p>
            </div>
            <p className="text-lg font-bold text-rose-600">
              ${order.product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
