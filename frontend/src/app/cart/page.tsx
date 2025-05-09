"use client";
import { clearCart } from "@/api/cart/clearCart";
import { getCart } from "@/api/cart/getCart";
import { removeFromCart } from "@/api/cart/removeFromCart";
import { updateQuantityAPI } from "@/api/cart/updateQuantityAPI";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { CartArrayType } from "@/utils/types";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartArrayType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user) {
          return;
        }
        const response = await getCart(user.userId);
        if (response) {
          setCartItems(response);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setMessage("Failed to load cart items. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [router, user]);

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (!cartItems || !user) return;
    setCartItems((prevItems) => {
      if (!prevItems) return null;

      return {
        ...prevItems,
        items: prevItems.items.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        ),
      };
    });

    try {
      const item = cartItems.items.find((item) => item._id === itemId);
      if (!item) return;

      const response = await updateQuantityAPI(
        user.userId,
        item.productId._id,
        newQuantity
      );

      if (!response) {
        setMessage("Failed to update quantity. Please try again.");
        fetchCart();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      setMessage("Failed to update quantity. Please try again.");
      const fetchCart = async () => {
        if (user) {
          const response = await getCart(user.userId);
          if (response) {
            setCartItems(response);
          }
        }
      };
      fetchCart();
    }

    setTimeout(() => setMessage(""), 2000);
  };

  const removeItem = async (itemId: string) => {
    if (!cartItems || !user) return;

    setCartItems((prevItems) => {
      if (!prevItems) return null;

      return {
        ...prevItems,
        items: prevItems.items.filter((item) => item.productId._id !== itemId),
      };
    });

    try {
      const response = await removeFromCart(user.userId, itemId);
      setMessage(response.message);
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error removing item:", error);
      setMessage("Failed to remove item. Please try again.");

      const fetchCart = async () => {
        if (user) {
          const response = await getCart(user.userId);
          if (response) {
            setCartItems(response);
          }
        }
      };
      fetchCart();
    }

    setTimeout(() => setMessage(""), 2000);
  };

  const handleCheckout = () => {
    setMessage("Proceeding to checkout...");
    setTimeout(() => {
      setMessage("");
      router.push("/checkout");
    }, 1000);
  };

  const fetchCart = async () => {
    if (!user) return;
    try {
      const response = await getCart(user.userId);
      if (response) {
        setCartItems(response);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleClear = async () => {
    if (!cartItems || !user) return;
    setCartItems((prevItems) => {
      if (!prevItems) return null;

      return {
        ...prevItems,
        items: [],
      };
    });

    try {
      const response = await clearCart(user.userId);
      setMessage(response.message);
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error clearing cart:", error);
      setMessage("Failed to clear cart. Please try again.");
    }
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
        <Loader />
      ) : !cartItems || cartItems.items.length === 0 ? (
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Cart Items ({cartItems.items.length})
                </h2>
                <button
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                  onClick={handleClear}
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2">
                {cartItems.items.map((item) => (
                  <CartItem
                    key={item._id}
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
