"use client";

import { Suspense } from 'react';
import { Navigation } from "@/components/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { formatToIDR } from "@/lib/checkout";
import { PaymentSuccessModal } from "@/components/payment-success-modal";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [selectedDelivery, setSelectedDelivery] = useState("delivery");
  const [agreed, setAgreed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Get product details from URL params
  const productName = searchParams.get("product") || "Custom Pants";
  const price = searchParams.get("price") || "0";
  const quantity = searchParams.get("quantity") || "1";
  const imageUrl = searchParams.get("image") || "/pants-preview.jpg";

  const subtotal = parseFloat(price) * parseInt(quantity);
  const shipping = selectedDelivery === "delivery" ? 5.0 : 0;
  const total = subtotal + shipping;

  const handlePayNow = () => {
    // Here you would normally process the payment
    // For now, we'll just show the success modal
    setShowSuccessModal(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-32">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold mb-8">Checkout</h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Shipping Information
                </h2>
                <div className="flex gap-4 mb-6">
                  <button
                    className={`flex-1 py-3 px-4 rounded-md border ${
                      selectedDelivery === "delivery"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedDelivery("delivery")}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedDelivery === "delivery"
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-400"
                        }`}
                      />
                      Delivery
                    </div>
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 rounded-md border ${
                      selectedDelivery === "pickup"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedDelivery("pickup")}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedDelivery === "pickup"
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-400"
                        }`}
                      />
                      Pick up
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              {selectedDelivery === "delivery" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    >
                      <option value="">Choose country</option>
                      <option value="US">United States</option>
                      <option value="ID">Indonesia</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                        placeholder="Enter ZIP code"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I have read and agree to the Terms and Conditions.
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Review your cart</h2>

              <div className="flex gap-4 mb-6">
                <div className="relative w-20 h-20">
                  <Image
                    src={imageUrl}
                    alt={productName}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{productName}</h3>
                  <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                  <p className="font-medium">
                    {formatToIDR(parseFloat(price))}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatToIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{formatToIDR(shipping)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>{formatToIDR(total)}</span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!agreed}
              onClick={handlePayNow}
            >
              Pay Now
            </button>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="font-medium">
                  Secure Checkout - SSL Encrypted
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Ensuring your financial and personal details are secure during
                every transaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        orderDetails={{
          productName,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          shipping,
          total,
          imageUrl,
        }}
      />
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
