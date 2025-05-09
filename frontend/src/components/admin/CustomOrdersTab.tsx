"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getAllOrders } from "@/api/custom/getAllOrders";
import { changeStatus } from "@/api/custom/changeStatus";

// Custom Order type definition
type CustomOrder = {
  _id: string;
  name: string;
  description: string;
  image: string | null;
  status: string;
  price: number;
  createdAt: string;
  contact?: {
    email?: string;
    phone?: string;
  };
};

export default function CustomOrdersTab() {
  // State for custom orders
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [priceInput, setPriceInput] = useState("0");

  // Mock fetch custom orders (replace with actual API call)
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllOrders();
      setCustomOrders(products);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle price update
  const handlePriceUpdate = (orderId: string) => {
    const price = parseFloat(priceInput);
    if (isNaN(price) || price < 0) return;

    setCustomOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, price } : order
      )
    );
    setPriceInput("0");
  };

  // Handle status update
  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const response = await changeStatus(orderId);
    if (response.success) {
      setCustomOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } else {
      alert("Failed to update order status");
    }
  };

  // Open contact dialog
  const openContactDialog = (order: CustomOrder) => {
    setSelectedOrder(order);
    setContactDetails({
      email: order.contact?.email || "",
      phone: order.contact?.phone || "",
      message: "",
    });
    setIsContactDialogOpen(true);
  };

  // Close contact dialog
  const closeContactDialog = () => {
    setIsContactDialogOpen(false);
    setSelectedOrder(null);
    setContactDetails({
      email: "",
      phone: "",
      message: "",
    });
  };

  // Handle contact form input changes
  const handleContactInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call to send message
    alert(`Message sent to customer: ${contactDetails.message}`);
    closeContactDialog();
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading custom orders...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Custom Orders Management
        </h2>
        <p className="text-gray-600 mt-1">
          Review and manage custom order requests from customers
        </p>
      </div>

      {/* Custom Orders List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Request
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  No custom orders found
                </td>
              </tr>
            ) : (
              customOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-4">
                    <div className="flex">
                      {order.image && (
                        <div className="h-16 w-16 rounded bg-gray-100 relative overflow-hidden mr-3">
                          <Image
                            src={order.image}
                            alt={order.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {order.description.length > 50
                            ? `${order.description.substring(0, 50)}...`
                            : order.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : order.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {order.status === "pending" ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          className="border border-gray-300 rounded-md px-2 py-1 w-20"
                          value={
                            order._id === selectedOrder?._id
                              ? priceInput
                              : order.price
                          }
                          onChange={(e) => setPriceInput(e.target.value)}
                          onClick={() => setSelectedOrder(order)}
                        />
                        <button
                          onClick={() => handlePriceUpdate(order._id)}
                          className="text-xs bg-pink-500 text-white px-2 py-1 rounded hover:bg-pink-600"
                        >
                          Set
                        </button>
                      </div>
                    ) : (
                      <span>${order.price}</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(order._id, "approved")
                            }
                            className="text-green-600 hover:text-green-800 text-sm"
                            disabled={order.price <= 0}
                            title={
                              order.price <= 0
                                ? "Set a price first"
                                : "Approve order"
                            }
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(order._id, "rejected")
                            }
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => openContactDialog(order)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Contact
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Contact Dialog */}
      {isContactDialogOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Contact Customer about &quot;{selectedOrder.name}&quot;
            </h3>
            <form onSubmit={handleContactSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactDetails.email}
                    onChange={handleContactInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    placeholder="No email provided"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={contactDetails.phone}
                    onChange={handleContactInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    placeholder="No phone provided"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={contactDetails.message}
                    onChange={handleContactInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full h-32"
                    required
                    placeholder="Enter your message to the customer..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeContactDialog}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 font-medium"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
