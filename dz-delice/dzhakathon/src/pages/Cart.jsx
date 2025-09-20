import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, addToCart } = useCart();
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryOption === 'delivery' ? 200 : 0;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleConfirmOrder = async () => {
    // For cash payment, show confirmation directly
    if (paymentMethod === 'cash' || paymentMethod === 'lamouni') {
      setShowConfirmation(true);
      console.log('Order confirmed:', {
        items: cart,
        total,
        deliveryOption,
        paymentMethod
      });
      return;
    }

    // For card payment, navigate to payment page
    if (paymentMethod === 'card') {
      // Store order details in session storage
      const orderData = {
        items: cart,
        total,
        deliveryOption,
        paymentMethod,
        timestamp: new Date().toISOString()
      };
      sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
      
      // Navigate to payment page
      navigate('/payment');
    }
  };

  const generateOrderId = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const addTestItems = () => {
    // Add some test items to cart for testing payment flow
    const testItems = [
      { id: 'test1', name: 'Couscous Royal', price: 1500, image: '/path/to/image1.jpg' },
      { id: 'test2', name: 'Tagine aux Légumes', price: 1200, image: '/path/to/image2.jpg' },
      { id: 'test3', name: 'Baklawa Deluxe', price: 800, image: '/path/to/image3.jpg' }
    ];
    
    testItems.forEach(item => addToCart(item));
  };

  if (cart.length === 0 && !showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to your cart!</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dishes')}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Browse Menu
              </button>
              <br />
              <button
                onClick={addTestItems}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Test Items (For Testing)
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showConfirmation) {
    const orderId = generateOrderId();
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600">Thank you for your order</p>
            </div>

            {/* Order ID */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">Order ID: <span className="font-semibold">{orderId}</span></p>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded grid grid-cols-8 gap-px p-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${
                          Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                        } w-full h-full`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">QR Code</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 mb-6">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <span className="text-sm">{item.name} x{item.quantity}</span>
                  <span className="text-sm font-semibold">{(item.price * item.quantity).toFixed(2)} DA</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} DA</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  clearCart();
                  navigate('/');
                }}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate('/payment-details')}
                className="w-full border border-orange-500 text-orange-500 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Track Payment
              </button>
            </div>
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Order</h1>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-4">Order Items</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  {/* Item Image */}
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-500 text-xs">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-orange-500 font-semibold">{item.price} DA</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-4">Delivery Options</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={deliveryOption === 'pickup'}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                  className="text-orange-500"
                />
                <span className="flex-1">Pick-up</span>
                <span className="text-green-600 font-semibold">Free</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="delivery"
                  checked={deliveryOption === 'delivery'}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                  className="text-orange-500"
                />
                <span className="flex-1">Delivery</span>
                <span className="text-orange-500 font-semibold">200.00 DA</span>
              </label>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-orange-500"
                />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                    💳
                  </div>
                  <div className="flex-1">
                    <span>Credit/Debit Card</span>
                    <p className="text-xs text-gray-500">Secure online payment via Guiddini ePay</p>
                  </div>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-orange-500"
                />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center">
                    �
                  </div>
                  <div className="flex-1">
                    <span>Cash on Delivery</span>
                    <p className="text-xs text-gray-500">Pay when you receive your order</p>
                  </div>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="lamouni"
                  checked={paymentMethod === 'lamouni'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-orange-500"
                />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-6 bg-purple-500 rounded text-white text-xs flex items-center justify-center">
                    💰
                  </div>
                  <div className="flex-1">
                    <span>Lamouni</span>
                    <p className="text-xs text-gray-500">Algerian mobile payment service</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Receipt */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-4">Order Receipt</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{subtotal.toFixed(2)} DA</span>
              </div>
              {deliveryOption === 'delivery' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>{deliveryFee.toFixed(2)} DA</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-orange-500">{total.toFixed(2)} DA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Button */}
        <button
          onClick={handleConfirmOrder}
          className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
        >
          {paymentMethod === 'card' ? 'Proceed to Payment' : 'Confirm Order'} - {total.toFixed(2)} DA
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
