import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Get order data from session storage
    const pendingOrder = sessionStorage.getItem('pendingOrder');
    if (pendingOrder) {
      setOrderData(JSON.parse(pendingOrder));
    }

    // Get error information from URL parameters
    const errorCode = searchParams.get('errorCode');
    const errorMsg = searchParams.get('errorMessage');
    
    if (errorMsg) {
      setErrorMessage(decodeURIComponent(errorMsg));
    } else if (errorCode) {
      setErrorMessage(`Payment failed with error code: ${errorCode}`);
    } else {
      setErrorMessage('Payment was cancelled or failed to process.');
    }
  }, [searchParams]);

  const handleRetryPayment = () => {
    // Navigate back to payment page to retry
    navigate('/payment');
  };

  const handleBackToCart = () => {
    // Navigate back to cart to modify order
    navigate('/cart');
  };

  const handleContactSupport = () => {
    // You can implement contact support functionality here
    // For now, we'll show an alert
    alert('Please contact our support team at support@dzdelice.com or call +213 XXX XXX XXX');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-red-500 text-white p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Payment Failed</h1>
            <p className="opacity-90 mt-2">Your payment could not be processed</p>
          </div>

          {/* Error Information */}
          <div className="p-6 border-b">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">What happened?</h3>
              <p className="text-red-700">{errorMessage}</p>
            </div>
          </div>

          {/* Order Information */}
          {orderData && (
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold mb-4">Order Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {orderData.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} DA</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Amount</span>
                      <span className="text-[#F67F20]">{orderData.total?.toFixed(2)} DA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold mb-4">What can you do next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">1</span>
                </div>
                <div>
                  <p className="font-medium">Try payment again</p>
                  <p className="text-sm text-gray-600">Sometimes payment issues are temporary. Try again with the same or different payment method.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium">Check your payment details</p>
                  <p className="text-sm text-gray-600">Ensure your card details are correct and you have sufficient funds.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">3</span>
                </div>
                <div>
                  <p className="font-medium">Contact your bank</p>
                  <p className="text-sm text-gray-600">Your bank might be blocking the transaction for security reasons.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6">
            <div className="space-y-3">
              <button
                onClick={handleRetryPayment}
                className="w-full bg-[#F67F20] text-white py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors"
              >
                Try Payment Again
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleBackToCart}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back to Cart
                </button>
                <button
                  onClick={handleContactSupport}
                  className="px-4 py-2 border border-[#F67F20] text-[#F67F20] rounded-lg font-medium hover:bg-[#F67F20]/10 transition-colors"
                >
                  Contact Support
                </button>
              </div>
              <button
                onClick={() => navigate('/')}
                className="w-full text-gray-600 py-2 font-medium hover:text-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentFailure;