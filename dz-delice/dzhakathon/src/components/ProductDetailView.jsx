import React, { useState } from 'react';

const ProductDetailView = ({ onBack, onNavigateToMenu }) => {
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  const handleSeeMoreMeals = () => {
    if (onNavigateToMenu) {
      onNavigateToMenu();
    }
  };

  // Notification handler
  const showOrderNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  // Handle add to order
  const handleAddToOrder = () => {
    try {
      // Add your add to cart logic here
      console.log(`Adding ${quantity} ${selectedSize} size item(s) to order...`);
      
      // Show success notification
      showOrderNotification("success", `Added ${quantity} item(s) to your order! 🛒`);
      
      // You can add cart context logic here
    } catch (error) {
      // Show error notification
      showOrderNotification("error", "Failed to add item to order. Please try again.");
    }
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  const ingredients = [
    { name: 'Mozzarella', image: '/api/placeholder/60/60' },
    { name: 'Gorgonzola', image: '/api/placeholder/60/60' },
    { name: 'Tomatoes', image: '/api/placeholder/60/60' },
    { name: 'Basil', image: '/api/placeholder/60/60' }
  ];

  const relatedItems = [
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan',
      price: 1000,
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan',
      price: 1000,
      image: '/api/placeholder/80/80'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* Meal Category Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-black">Meal category</h2>
          <span className="text-sm text-gray-500">
            If you want different size of the same order you have to make two orders and do not increment the number!
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 mb-8">
          <button className="px-6 py-3 rounded-full text-sm font-medium bg-orange-500 text-white">
            All
          </button>
          <button className="px-6 py-3 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
            Pizza
          </button>
          <button className="px-6 py-3 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
            Burger
          </button>
          <button className="px-6 py-3 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
            Pasta
          </button>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left side - Image */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Vegetarian Pizza</h1>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-lg font-bold">4.8</span>
              <div className="flex text-orange-400">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/api/placeholder/400/300" 
              alt="Vegetarian Pizza"
              className="w-full h-64 object-cover rounded-2xl"
            />
            {/* Decorative elements */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="absolute top-1/2 -left-4 w-3 h-3 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        {/* Right side - Details */}
        <div className="space-y-6">
          {/* Points and Description */}
          <div>
            <p className="text-sm text-gray-500 mb-2">5 points</p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Ingredients:</strong> Mozzarella, gorgonzola, parmesan, ricotta Rich, cheesy flavor
            </p>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Size</h3>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-20 h-10 rounded-full border-2 font-medium transition-colors text-sm ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-600 hover:border-orange-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <div className="grid grid-cols-4 gap-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg mb-1 mx-auto flex items-center justify-center">
                    <img 
                      src={ingredient.image} 
                      alt={ingredient.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                  </div>
                  <p className="text-xs text-gray-600">{ingredient.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notes/Allergies */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Notes / Allergies</h3>
            <p className="text-sm text-gray-600">No parmesan , Allergy from ...</p>
          </div>

          {/* Agreement checkbox */}
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="agreement" 
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="agreement" className="text-sm text-gray-600">
              I agree to terms and policies once true mail BE-001
            </label>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-lg"
              >
                -
              </button>
              <span className="text-lg font-semibold w-6 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-lg"
              >
                +
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Full price - 750 DA</p>
                <p className="text-xs text-gray-500">I add to order</p>
              </div>
              <button 
                onClick={handleAddToOrder}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
              >
                Add to order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      <div className="border-t pt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Related Items</h3>
          <button 
            onClick={handleSeeMoreMeals}
            className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            See more meals →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-[100px] border border-gray-200 p-4 flex gap-4 items-center">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">{item.price}</span>
                  <button className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors flex items-center gap-1">
                    more
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {showNotification && (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-500 ease-in-out ${
          showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className={`rounded-lg p-4 shadow-lg border-l-4 ${
            notificationType === 'success' 
              ? 'bg-green-50 border-green-400' 
              : 'bg-red-50 border-red-400'
          }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {notificationType === 'success' ? (
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  notificationType === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {notificationMessage}
                </p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setShowNotification(false)}
                  className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    notificationType === 'success' 
                      ? 'text-green-500 hover:bg-green-100 focus:ring-green-600' 
                      : 'text-red-500 hover:bg-red-100 focus:ring-red-600'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailView;