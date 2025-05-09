"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileDetails from "@/components/profile/ProfileDetails";
import LikedProducts from "@/components/profile/LikedProducts";
import CustomOrders from "@/components/profile/CustomOrders";
import PastOrders from "@/components/profile/PastOrders";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { signout } from "@/api/user/signout";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-rose-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-4 w-32 bg-rose-200 rounded mb-6"></div>
          <div className="bg-white rounded-lg shadow p-8 animate-pulse">
            <div className="h-8 w-64 bg-rose-100 rounded mb-8"></div>
            <div className="h-24 w-full bg-rose-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return;
  }

  const handleSignOut = async () => {
    try {
      const response = await signout(user.token);
      if (response.success) {
        logout();
        router.push("/signin");
      } else {
        console.error("Sign out failed:", response.message);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const tabs = [
    { id: "profile", label: "My Profile" },
    { id: "liked", label: "Liked Products" },
    { id: "custom", label: "Custom Orders" },
    { id: "orders", label: "Past Orders" },
  ];

  return (
    <div className="min-h-screen bg-rose-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6 justify-between">
          <h1 className="text-3xl font-bold text-rose-800 mb-8">My Account</h1>
          <button
            className="inline-flex p-2 rounded-b-md items-center text-md font-medium text-red-600 hover:text-red-800 transition-colors"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>

        <div className="mb-8 border-b border-rose-200">
          <div className="flex flex-wrap -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`mr-8 py-4 px-1 font-medium text-lg border-b-2 ${
                  activeTab === tab.id
                    ? "border-rose-600 text-rose-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === "profile" && <ProfileDetails user={user} />}
          {activeTab === "liked" && <LikedProducts />}
          {activeTab === "custom" && <CustomOrders />}
          {activeTab === "orders" && <PastOrders />}
        </div>

        <div className="fixed bottom-8 right-8">
          <Link
            href="/cart"
            className="flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg p-4 transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="ml-2 font-medium">View Cart</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
