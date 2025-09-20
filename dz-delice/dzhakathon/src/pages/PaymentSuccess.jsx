import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState(null);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    // Get order data from session storage
    const pendingOrder = sessionStorage.getItem('pendingOrder');
    if (pendingOrder) {
      const orderInfo = JSON.parse(pendingOrder);
      setOrderData(orderInfo);
      
      // Clear the cart since payment was successful
      clearCart();
      
      // Remove the pending order from session storage
      sessionStorage.removeItem('pendingOrder');
    }

    // Get transaction information from URL parameters
    const txnId = searchParams.get('transactionId') || searchParams.get('orderNumber');
    if (txnId) {
      setTransactionId(txnId);
    }
  }, [searchParams, clearCart]);

  const generateOrderId = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const orderNumber = transactionId || generateOrderId();

  const handleViewDetails = () => {
    if (transactionId) {
      navigate(`/payment-details/${transactionId}`);
    } else {
      navigate('/payment-details');
    }
  };

  const handleNewOrder = () => {
    navigate('/dishes');
  };

  const handleTrackOrder = () => {
    navigate('/payment-details');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 text-white p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="opacity-90 mt-2">Your order has been confirmed</p>
          </div>

          {/* Transaction Information */}
          <div className="p-6 border-b">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Transaction Confirmed</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Order Number:</span>
                  <span className="font-mono font-semibold text-green-800">{orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Payment Status:</span>
                  <span className="font-semibold text-green-800">Completed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Transaction Date:</span>
                  <span className="font-semibold text-green-800">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          {orderData && (
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {orderData.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{item.name} x{item.quantity}</span>
                      <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} DA</span>
                    </div>
                  ))}
                  {orderData.deliveryOption === 'delivery' && (
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Delivery Fee</span>
                      <span>200.00 DA</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Paid</span>
                      <span className="text-[#F67F20]">{orderData.total?.toFixed(2)} DA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Information */}
          {orderData && (
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-blue-800">
                      {orderData.deliveryOption === 'delivery' ? 'Home Delivery' : 'Pick-up'}
                    </p>
                    <p className="text-sm text-blue-600">
                      {orderData.deliveryOption === 'delivery' 
                        ? 'Your order will be delivered to your address' 
                        : 'Your order will be ready for pickup at our restaurant'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">1</span>
                </div>
                <div>
                  <p className="font-medium">Order Confirmation</p>
                  <p className="text-sm text-gray-600">You'll receive an SMS confirmation with your order details.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium">Preparation</p>
                  <p className="text-sm text-gray-600">Our chefs will start preparing your delicious meal.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">3</span>
                </div>
                <div>
                  <p className="font-medium">
                    {orderData?.deliveryOption === 'delivery' ? 'Delivery' : 'Ready for Pickup'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {orderData?.deliveryOption === 'delivery' 
                      ? 'Your order will be delivered to your doorstep.' 
                      : 'We\'ll notify you when your order is ready for pickup.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6">
            <div className="space-y-3">
              <button
                onClick={handleViewDetails}
                className="w-full bg-[#F67F20] text-white py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors"
              >
                View Payment Details & Receipt
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleTrackOrder}
                  className="px-4 py-2 border border-[#F67F20] text-[#F67F20] rounded-lg font-medium hover:bg-[#F67F20]/10 transition-colors"
                >
                  Track Order
                </button>
                <button
                  onClick={handleNewOrder}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Order Again
                </button>
              </div>
              <button
                onClick={() => navigate('/')}
                className="w-full text-gray-600 py-2 font-medium hover:text-gray-800 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
