import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { getCount } from "@/api/cart/getCount";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Cart() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchCartCount = async () => {
      try {
        const response = await getCount(user.userId);
        if (response) {
          setCount(response);
        } else {
          setCount(0);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };
    fetchCartCount();
  }, [user]);

  if (!user) {
    return;
  }

  return (
    <div className="ml-4 flow-root lg:ml-6">
      <Link href="/cart" className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {count}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </Link>
    </div>
  );
}
