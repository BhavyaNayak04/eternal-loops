"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { CartArrayType } from "@/types";
import { getCart } from "@/api/cart/getCart";
import Loader from "@/components/Loader";
import { CheckCircle, ChevronDown, MapPin, ArrowRight, CreditCard, Truck } from "lucide-react";

// Karnataka districts
const karnatakaDistricts = [
  "Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Mangaluru", "Belagavi", 
  "Hubballi-Dharwad", "Kalaburagi", "Davanagere", "Ballari", "Vijayapura", 
  "Shivamogga", "Tumakuru", "Raichur", "Bidar", "Gadag", "Koppal", "Bagalkote", 
  "Chamarajanagara", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", 
  "Dakshina Kannada", "Hassan", "Haveri", "Kodagu", "Kolar", "Mandya", 
  "Ramanagara", "Udupi", "Uttara Kannada", "Yadgir"
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartArrayType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [deliveryOption, setDeliveryOption] = useState("standard");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user) {
          setIsLoading(false);
          router.push("/signin");
          return;
        }
        const response = await getCart(user.userId);
        if (response) {
          if (response.items.length === 0) {
            setMessage("Your cart is empty. Add items to proceed with checkout.");
            router.push("/shop");
          } else {
            setCartItems(response);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setMessage("Failed to load cart items. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [user, router]);

  // Handle form changes
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateShippingInfo = () => {
    const { fullName, phone, email, addressLine1, city, pincode } = shippingInfo;
    if (!fullName || !phone || !email || !addressLine1 || !city || !pincode) {
      setMessage("Please fill all required fields");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setMessage("Please enter a valid 10-digit Indian phone number");
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setMessage("Please enter a valid 6-digit pincode");
      return false;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setMessage("Please enter a valid email address");
      return false;
    }
    setMessage("");
    return true;
  };

  // Handle step transitions
  const nextStep = () => {
    if (step === 1 && validateShippingInfo()) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Calculate order details
  const calculateSubtotal = () => {
    if (!cartItems) return 0;
    return cartItems.items.reduce(
      (total, item) => total + item.quantity * item.productId.price,
      0
    );
  };

  const calculateDeliveryCharge = () => {
    const subtotal = calculateSubtotal();
    if (subtotal >= 500) return 0;
    return deliveryOption === "express" ? 99 : 49;
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryCharge() + calculateGST();
  };

  // Handle Razorpay payment
  const initializeRazorpay = () => {
    return new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    try {
      await initializeRazorpay();
      
      // In a real application, you would call your API to create an order
      // For demo purposes, we're mocking this part
      const orderAmount = calculateTotal() * 100; // Razorpay uses amount in paise
      
      // Mock order creation
      const mockOrderId = "order_" + Math.random().toString(36).substring(2, 15);
      
      const options = {
        key: "rzp_test_YOUR_KEY_ID", // Replace with your actual test key in production
        amount: orderAmount,
        currency: "INR",
        name: "Your Shop Name",
        description: "Thank you for your purchase",
        order_id: mockOrderId,
        handler: function (response) {
          // This function runs when payment is successful
          setPaymentSuccess(true);
          setOrderId(response.razorpay_payment_id);
          setStep(4);
        },
        prefill: {
          name: shippingInfo.fullName,
          email: shippingInfo.email,
          contact: shippingInfo.phone
        },
        notes: {
          address: `${shippingInfo.addressLine1}, ${shippingInfo.addressLine2}, ${shippingInfo.city}, ${shippingInfo.district}, ${shippingInfo.state}, ${shippingInfo.pincode}`
        },
        theme: {
          color: "#db2777" // pink-600
        }
      };
      
      // @ts-ignore - Razorpay is loaded dynamically
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment failed", error);
      setMessage("Payment initialization failed. Please try again.");
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "razorpay") {
      makePayment();
    } else if (paymentMethod === "cod") {
      // Handle Cash on Delivery
      setPaymentSuccess(true);
      setOrderId("COD" + Date.now());
      setStep(4);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      {message && (
        <div className="mb-4 p-3 bg-pink-50 text-pink-700 rounded-md text-sm">
          {message}
        </div>
      )}

      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${step >= 1 ? "text-pink-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-pink-600 text-white" : "bg-gray-200"}`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">Shipping</span>
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? "bg-pink-600" : "bg-gray-200"}`}></div>
          
          <div className={`flex items-center ${step >= 2 ? "text-pink-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-pink-600 text-white" : "bg-gray-200"}`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Delivery</span>
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? "bg-pink-600" : "bg-gray-200"}`}></div>
          
          <div className={`flex items-center ${step >= 3 ? "text-pink-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-pink-600 text-white" : "bg-gray-200"}`}>
              3
            </div>
            <span className="ml-2 text-sm font-medium">Payment</span>
          </div>
          <div className={`h-1 w-16 ${step >= 4 ? "bg-pink-600" : "bg-gray-200"}`}></div>
          
          <div className={`flex items-center ${step >= 4 ? "text-pink-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? "bg-pink-600 text-white" : "bg-gray-200"}`}>
              4
            </div>
            <span className="ml-2 text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Checkout Form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="mr-2" size={20} />
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingInfoChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      placeholder="10-digit mobile number"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode*
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingInfo.pincode}
                      onChange={handleShippingInfoChange}
                      placeholder="6-digit pincode"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1*
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={shippingInfo.addressLine1}
                      onChange={handleShippingInfoChange}
                      placeholder="House No., Building Name, Street"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={shippingInfo.addressLine2}
                      onChange={handleShippingInfoChange}
                      placeholder="Locality, Landmark (optional)"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      District*
                    </label>
                    <div className="relative">
                      <select
                        name="district"
                        value={shippingInfo.district}
                        onChange={handleShippingInfoChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 appearance-none"
                      >
                        {karnatakaDistricts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      <ChevronDown 
                        size={16} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Delivery Options */}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Truck className="mr-2" size={20} />
                  Delivery Options
                </h2>

                <div className="space-y-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      deliveryOption === "standard" ? "border-pink-500 bg-pink-50" : "border-gray-200"
                    }`}
                    onClick={() => setDeliveryOption("standard")}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Standard Delivery</h3>
                        <p className="text-sm text-gray-500">
                          Delivery in 3-5 business days
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">
                          {calculateSubtotal() >= 500 ? "FREE" : "₹49"}
                        </span>
                        {deliveryOption === "standard" && (
                          <CheckCircle size={18} className="text-pink-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      deliveryOption === "express" ? "border-pink-500 bg-pink-50" : "border-gray-200"
                    }`}
                    onClick={() => setDeliveryOption("express")}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Express Delivery</h3>
                        <p className="text-sm text-gray-500">
                          Delivery in 1-2 business days
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">₹99</span>
                        {deliveryOption === "express" && (
                          <CheckCircle size={18} className="text-pink-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Free standard delivery on orders above ₹500!</span>
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <CreditCard className="mr-2" size={20} />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      paymentMethod === "razorpay" ? "border-pink-500 bg-pink-50" : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("razorpay")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                          <Image 
                            src="/razorpay-logo.png" 
                            alt="Razorpay" 
                            className="h-5 w-auto object-contain"
                            width={24}
                            height={24}
                            onError={(e) => {
                              // Fallback if image doesn't load
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23072654' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cline x1='3' y1='10' x2='21' y2='10'/%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">Razorpay</h3>
                          <p className="text-sm text-gray-500">
                            Credit/Debit Card, UPI, Netbanking, Wallets
                          </p>
                        </div>
                      </div>
                      {paymentMethod === "razorpay" && (
                        <CheckCircle size={18} className="text-pink-500" />
                      )}
                    </div>
                  </div>

                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      paymentMethod === "cod" ? "border-pink-500 bg-pink-50" : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                            <rect x="2" y="6" width="20" height="12" rx="2" />
                            <circle cx="12" cy="12" r="2" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Cash on Delivery</h3>
                          <p className="text-sm text-gray-500">
                            Pay when your order arrives
                          </p>
                        </div>
                      </div>
                      {paymentMethod === "cod" && (
                        <CheckCircle size={18} className="text-pink-500" />
                      )}
                    </div>
                  </div>
                </div>

                {paymentMethod === "cod" && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                    <p className="text-sm text-yellow-700">
                      <span className="font-medium">Note:</span> A ₹20 handling fee will be added for Cash on Delivery orders.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Order Confirmation */}
            {step === 4 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Order Confirmed!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. Your order has been placed successfully.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mx-auto max-w-md mb-6">
                  <p className="text-sm text-gray-500 mb-1">Order ID:</p>
                  <p className="font-medium text-gray-900">{orderId}</p>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  You will receive an email confirmation with your order details shortly.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => router.push(`/my-orders/${orderId}`)}
                    className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Track Order
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/cart")}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Return to Cart
                  </button>
                )}

                {step === 3 ? (
                  <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors flex items-center"
                  >
                    Place Order
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors flex items-center"
                  >
                    Continue
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          {step < 4 && cartItems && (
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              {/* Item List */}
              <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
                {cartItems.items.map((item) => (
                  <div key={item._id} className="flex items-center py-2">
                    <div className="w-12 h-12 relative bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.productId.image}
                        alt={item.productId.name}
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-3 flex-grow overflow-hidden">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.productId.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="ml-2 text-sm font-medium text-gray-900">
                      ₹{item.productId.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{calculateGST().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {calculateDeliveryCharge() === 0 
                      ? "FREE" 
                      : `₹${calculateDeliveryCharge().toFixed(2)}`}
                  </span>
                </div>
                {paymentMethod === "cod" && step >= 3 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">COD Handling Fee</span>
                    <span className="font-medium">₹20.00</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-pink-600">₹{(calculateTotal() + (paymentMethod === "cod" && step >= 3 ? 20 : 0)).toFixed(2)}</span>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-6 text-xs text-gray-500">
                <p className="mb-2">
                  All prices include GST. Shipping calculated at checkout.
                </p>
                <p>
                  By proceeding, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}