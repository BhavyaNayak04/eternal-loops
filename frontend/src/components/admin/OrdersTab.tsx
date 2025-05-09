"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Order type definition based on the schema
type Order = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  products: {
    productId: {
      _id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
};

export default function OrdersTab() {
  // State for orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock fetch orders (replace with actual API call)
  useEffect(() => {
    // Simulate API call with sample data
    const mockOrders: Order[] = [
      {
        _id: "681e4c7d0a9991f89e63b3cd",
        userId: {
          _id: "681e4c7d0a9991f89e63b3ca",
          name: "Jane Smith",
          email: "jane.smith@example.com"
        },
        products: [
          {
            productId: {
              _id: "681e149ce7f0ac7ff37638a9",
              name: "Bil Kitty",
              price: 300,
              image: "https://picsum.photos/1097/1024"
            },
            quantity: 1
          },
          {
            productId: {
              _id: "681e149ce7f0ac7ff37638a8",
              name: "Cutie Pie",
              price: 300,
              image: "https://picsum.photos/1028/1054"
            },
            quantity: 2
          }
        ],
        totalAmount: 900,
        status: "pending",
        createdAt: "2025-05-09T14:25:12.471Z"
      },
      {
        _id: "681e4c7d0a9991f89e63b3ce",
        userId: {
          _id: "681e4c7d0a9991f89e63b3cb",
          name: "John Doe",
          email: "john.doe@example.com"
        },
        products: [
          {
            productId: {
              _id: "681e149ce7f0ac7ff37638a8",
              name: "Cutie Pie",
              price: 300,
              image: "https://picsum.photos/1028/1054"
            },
            quantity: 1
          }
        ],
        totalAmount: 300,
        status: "shipped",
        createdAt: "2025-05-08T10:15:32.471Z"
      }
    ];

    setOrders(mockOrders);
    setIsLoading(false);
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle status update
  const handleStatusUpdate = (orderId: string, newStatus: "pending" | "shipped" | "delivered" | "cancelled") => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    // If the order being updated is the currently selected order, update it too
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // View order details
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  // Close order details modal
  const closeOrderDetails = () => {
    setIsOrderDetailsOpen(false);
    setSelectedOrder(null);
  };

  // Filter orders based on status
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Orders Management</h2>
        
        {/* Status Filter */}
        <div className="flex items-center">
          <label className="mr-2 text-sm text-gray-600">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-3">
                    <span className="text-gray-800 font-mono">
                      #{order._id.substring(order._id.length - 8)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">{order.userId.name}</p>
                      <p className="text-sm text-gray-500">{order.userId.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-medium">
                    ${order.totalAmount}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2 items-center">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Details
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value as "pending" | "shipped" | "delivered" | "cancelled")}
                        className="border border-gray-300 text-sm rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isOrderDetailsOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Order Details <span className="text-gray-600 font-mono">#{selectedOrder._id.substring(selectedOrder._id.length - 8)}</span>
              </h3>
              <button onClick={closeOrderDetails} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Order Information</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="flex justify-between py-1">
                    <span className="text-gray-600">Date:</span> 
                    <span className="font-medium">{formatDate(selectedOrder.createdAt)}</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span className="text-gray-600">Status:</span> 
                    <span className={`font-medium ${getStatusBadgeClass(selectedOrder.status)} px-2 rounded`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span className="text-gray-600">Total Amount:</span> 
                    <span className="font-medium">${selectedOrder.totalAmount}</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="flex justify-between py-1">
                    <span className="text-gray-600">Name:</span> 
                    <span className="font-medium">{selectedOrder.userId.name}</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span className="text-gray-600">Email:</span> 
                    <span className="font-medium">{selectedOrder.userId.email}</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span className="text-gray-600">Customer ID:</span> 
                    <span className="font-medium font-mono">{selectedOrder.userId._id.substring(selectedOrder.userId._id.length - 8)}</span>
                  </p>
                </div>
              </div>
            </div>

            <h4 className="text-sm font-medium text-gray-500 mb-2">Order Items</h4>
            <div className="bg-gray-50 rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Quantity</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedOrder.products.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded bg-gray-100 relative overflow-hidden mr-3">
                            <Image
                              src={item.productId.image}
                              alt={item.productId.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium text-gray-800">{item.productId.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-800">${item.productId.price}</td>
                      <td className="px-4 py-3 text-gray-800">{item.quantity}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium">
                        ${item.productId.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-100">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-medium">Total:</td>
                    <td className="px-4 py-3 font-medium text-pink-600">${selectedOrder.totalAmount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={closeOrderDetails}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium"
              >
                Close
              </button>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusUpdate(selectedOrder._id, e.target.value as "pending" | "shipped" | "delivered" | "cancelled")}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 font-medium"
              >
                <option value="pending">Mark as Pending</option>
                <option value="shipped">Mark as Shipped</option>
                <option value="delivered">Mark as Delivered</option>
                <option value="cancelled">Mark as Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}