'use client'
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import Loader from "@/components/Loader";
import { Product } from "@/types";
import { ShoppingBag, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface CartItemType {
  product: Product;
  quantity: number;
  maxQuantity: number;
}
// Main Cart Page Component
export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    // Mock fetching cart data
    // In a real app, you would fetch this from your API
    const fetchCart = async () => {
      try {
    
        // Mock data
        const mockCartItems: CartItemType[] = [
          {
            product: {
              _id: "prod123",
              name: "Wireless pinktooth Headphones",
              price: 1299,
              image: "/api/placeholder/150/150",
              description:
                "High-quality wireless headphones with noise cancellation",
              tag: "Electronics",
              inStock: true,
            },
            quantity: 1,
            maxQuantity: 5,
          },
          {
            product: {
              _id: "prod456",
              name: "Smart Fitness Tracker",
              price: 2499,
              image: "/api/placeholder/150/150",
              description:
                "Track your fitness goals with this smart wearable device",
              tag: "Wearables",
              inStock: true,
            },
            quantity: 2,
            maxQuantity: 10,
          },
        ];

        setCartItems(mockCartItems);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setMessage("Failed to load cart items. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // In a real app, you would also update the quantity in your backend
    setMessage("Cart updated");
    setTimeout(() => setMessage(""), 2000);
  };

  const removeItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product._id !== productId)
    );

    // In a real app, you would also remove the item from your backend
    setMessage("Item removed from cart");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleCheckout = () => {
    setMessage("Proceeding to checkout...");
    setTimeout(() => setMessage(""), 1000);
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      {message && (
        <div className="mb-4 p-3 bg-pink-50 text-pink-700 rounded-md text-sm">
          {message}
        </div>
      )}

      {isLoading ? (
        <Loader/>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ShoppingBag size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you have not added any products to your cart yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Cart Items ({cartItems.length})
              </h2>

              <div className="space-y-2">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product._id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <OrderSummary cartItems={cartItems} onCheckout={handleCheckout} />
          </div>
        </div>
      )}
    </div>
  );
}
