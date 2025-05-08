import { CartArrayType } from "@/types/index";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

const OrderSummary = ({
  cartItems,
  onCheckout,
}: {
  cartItems: CartArrayType;
  onCheckout: () => void;
}) => {
  const subtotal = cartItems.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const shippingFee = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shippingFee;
  const totalItems = cartItems.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items ({totalItems})</span>
          <span className="text-gray-900 font-medium">
            Rs.{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping Fee</span>
          {shippingFee === 0 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span className="text-gray-900 font-medium">
              Rs.{shippingFee.toFixed(2)}
            </span>
          )}
        </div>

        {shippingFee > 0 && (
          <div className="text-xs text-gray-500 italic">
            Free shipping on orders above Rs.1000
          </div>
        )}

        <div className="pt-3 border-t border-gray-200 flex justify-between text-base">
          <span className="font-medium text-gray-900">Total</span>
          <span className="font-bold text-gray-900">Rs.{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md flex items-center justify-center transition-colors disabled:bg-gray-400"
        onClick={onCheckout}
        disabled={cartItems.items.length === 0}
      >
        <ShoppingBag size={16} className="mr-2" />
        Proceed to Buy
      </button>

      <div className="mt-4">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-800 transition-colors"
        >
          <ArrowLeft size={14} className="mr-1" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
