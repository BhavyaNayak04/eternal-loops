"use client";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "@/types";
interface CartItemType {
  product: Product;
  quantity: number;
  maxQuantity: number;
}
// Cart Item Component
const CartItem = ({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartItemType;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeItem: (productId: string) => void;
}) => {
  const incrementQuantity = () => {
    if (item.quantity < item.maxQuantity) {
      updateQuantity(item.product._id, item.quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product._id, item.quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0 relative bg-gray-50 rounded-md overflow-hidden">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          sizes="(max-width: 768px) 100vw, 96px"
          className="object-contain"
        />
      </div>

      <div className="flex-grow sm:ml-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            {item.product.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500">{item.product.tag}</p>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="text-sm font-medium text-gray-900">
            Rs.{item.product.price}
          </div>

          <div className="flex items-center">
            <button
              onClick={() => removeItem(item.product._id)}
              className="text-gray-400 hover:text-red-500 mr-4"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>

            <div className="flex items-center">
              <button
                className="w-6 h-6 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-l-md hover:bg-gray-200 transition-colors"
                onClick={decrementQuantity}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus
                  size={12}
                  className={
                    item.quantity <= 1 ? "text-gray-400" : "text-gray-700"
                  }
                />
              </button>

              <input
                type="text"
                className="w-8 h-6 border-t border-b border-gray-300 text-center text-xs font-medium"
                value={item.quantity}
                readOnly
              />

              <button
                className="w-6 h-6 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-r-md hover:bg-gray-200 transition-colors"
                onClick={incrementQuantity}
                disabled={item.quantity >= item.maxQuantity}
                aria-label="Increase quantity"
              >
                <Plus
                  size={12}
                  className={
                    item.quantity >= item.maxQuantity
                      ? "text-gray-400"
                      : "text-gray-700"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
