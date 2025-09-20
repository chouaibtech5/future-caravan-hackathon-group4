import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import ShopBagIcon from "../icons/ShopBagIcon.jsx";

export default function OrderModal({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getCartCount, clearCart } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const formatPrice = (price) => {
    return price.toLocaleString() + " DA";
  };

  const handleCheckout = () => {
    if (!selectedPayment) {
      setShowPaymentOptions(true);
      return;
    }

    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert(
        `Order placed successfully! Payment method: ${selectedPayment}. Thank you for your order.`
      );
      clearCart();
      setIsCheckingOut(false);
      setShowPaymentOptions(false);
      setSelectedPayment("");
      onClose();
    }, 2000);
  };

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    setShowPaymentOptions(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Order Panel */}
      <div className="relative bg-[#FFF8F0] w-full max-w-md h-full shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F67F20]/10 rounded-full flex items-center justify-center">
                <ShopBagIcon size={20} className="text-[#F67F20]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
                <p className="text-sm text-gray-500">{getCartCount()} items</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShopBagIcon size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-4">
                Add some delicious dishes to get started!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#F67F20] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {item.cuisine}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Price and Remove */}
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#F67F20]">
                            {formatPrice(
                              parseFloat(item.price.replace(/[^\d]/g, "")) *
                                item.quantity
                            )}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Total and Checkout */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-gray-200 px-6 py-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">
                Total:
              </span>
              <span className="text-2xl font-bold text-[#F67F20]">
                {formatPrice(calculateTotal())}
              </span>
            </div>

            {/* Payment Method Selection */}
            {showPaymentOptions && (
              <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Choose Payment Method:
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handlePaymentSelect("Baridi Mob")}
                    className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-[#F67F20] hover:bg-[#F67F20]/5 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        Baridi Mob
                      </div>
                      <div className="text-sm text-gray-500">
                        Mobile payment
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePaymentSelect("Carte Manétique")}
                    className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-[#F67F20] hover:bg-[#F67F20]/5 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path
                          fillRule="evenodd"
                          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        Carte Manétique
                      </div>
                      <div className="text-sm text-gray-500">
                        Credit/Debit card
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Selected Payment Method */}
            {selectedPayment && !showPaymentOptions && (
              <div className="mb-4 p-3 bg-[#F67F20]/10 border border-[#F67F20]/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#F67F20] rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Payment: {selectedPayment}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPayment("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[#F67F20] text-white py-3 rounded-xl font-semibold hover:bg-[#E55A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut
                ? "Processing..."
                : selectedPayment
                ? "Place Order"
                : "Choose Payment"}
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-2 text-gray-500 py-2 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
