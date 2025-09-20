import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentService from '../api/paymentService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('FR');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Get order data from session storage or URL params
    const pendingOrder = sessionStorage.getItem('pendingOrder');
    console.log('Retrieved pending order:', pendingOrder); // Debug log
    
    if (pendingOrder) {
      try {
        const parsedOrder = JSON.parse(pendingOrder);
        console.log('Parsed order data:', parsedOrder); // Debug log
        
        // Ensure the order has valid structure with fallback values
        const validatedOrder = {
          items: parsedOrder.items || [],
          total: parsedOrder.total || 0,
          deliveryOption: parsedOrder.deliveryOption || 'pickup',
          paymentMethod: parsedOrder.paymentMethod || 'card',
          timestamp: parsedOrder.timestamp || new Date().toISOString()
        };
        
        // If no items, create a sample order for testing
        if (!validatedOrder.items.length) {
          validatedOrder.items = [
            { id: 1, name: 'Sample Dish', price: 1500, quantity: 1 },
            { id: 2, name: 'Another Dish', price: 2000, quantity: 2 }
          ];
          validatedOrder.total = 5500; // 1500 + (2000*2)
        }
        
        setOrderData(validatedOrder);
      } catch (parseError) {
        console.error('Error parsing order data:', parseError);
        // Create default order for testing
        setOrderData({
          items: [
            { id: 1, name: 'Test Dish', price: 1200, quantity: 1 },
            { id: 2, name: 'Another Test Dish', price: 1800, quantity: 1 }
          ],
          total: 3000,
          deliveryOption: 'pickup',
          paymentMethod: 'card',
          timestamp: new Date().toISOString()
        });
      }
    } else {
      console.log('No pending order found, creating default'); // Debug log
      // Create default order for testing
      setOrderData({
        items: [
          { id: 1, name: 'Default Dish', price: 1500, quantity: 2 },
          { id: 2, name: 'Test Item', price: 2500, quantity: 1 }
        ],
        total: 4500,
        deliveryOption: 'pickup',
        paymentMethod: 'card',
        timestamp: new Date().toISOString()
      });
    }
  }, [navigate]);

  const handlePayment = async () => {
    if (!orderData) {
      setError('No order data found. Please try again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await paymentService.initiatePayment(orderData.total || 0, selectedLanguage);
      
      if (result.success && result.redirectUrl) {
        // Update order data with transaction ID
        const updatedOrderData = {
          ...orderData,
          transactionId: result.transactionId,
          paymentStatus: 'pending'
        };
        sessionStorage.setItem('pendingOrder', JSON.stringify(updatedOrderData));
        
        // Redirect to payment gateway
        window.location.href = result.redirectUrl;
      } else {
        setError(result.error || 'Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F67F20] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#F67F20] text-white p-6">
            <h1 className="text-2xl font-bold">Complete Payment</h1>
            <p className="opacity-90 mt-1">Review your order and proceed to payment</p>
          </div>

          {/* Order Summary */}
          {orderData && (
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                {orderData.items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
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
                    <span>Total Amount</span>
                    <span className="text-[#F67F20]">{orderData.total?.toFixed(2) || '0.00'} DA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Language Selection */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold mb-4">Payment Language</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { code: 'FR', label: 'Français', flag: '🇫🇷' },
                { code: 'EN', label: 'English', flag: '🇺🇸' },
                { code: 'AR', label: 'العربية', flag: '🇩🇿' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedLanguage === lang.code
                      ? 'border-[#F67F20] bg-[#F67F20]/10 text-[#F67F20]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <div className="text-sm font-medium">{lang.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-6 border-b">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Action */}
          <div className="p-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure payment powered by Guiddini ePay</span>
              </div>
              <p className="text-xs text-gray-500">
                You will be redirected to a secure payment page to complete your transaction.
              </p>
            </div>

                        <div className="flex gap-3">
              <button
                onClick={() => navigate('/cart')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Cart
              </button>
              {orderData && (
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-[#F67F20] text-white rounded-lg font-medium hover:bg-[#E55A2B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    `Proceed to Payment - ${orderData.total?.toFixed(2) || '0.00'} DA`
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;