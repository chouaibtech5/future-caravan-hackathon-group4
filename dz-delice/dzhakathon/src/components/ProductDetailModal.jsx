import React, { useState } from 'react';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  const ingredients = [
    { name: 'Mozzarella', image: '/api/placeholder/60/60' },
    { name: 'Gorgonzola', image: '/api/placeholder/60/60' },
    { name: 'Tomatoes', image: '/api/placeholder/60/60' },
    { name: 'Basil', image: '/api/placeholder/60/60' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Vegetarian Pizza</h1>
          </div>
          <div className="flex items-center gap-2">
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

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Image */}
            <div className="relative">
              <img 
                src="/api/placeholder/400/400" 
                alt="Vegetarian Pizza"
                className="w-full h-80 object-cover rounded-2xl"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-500 rounded-full"></div>
              <div className="absolute top-1/2 -left-6 w-4 h-4 bg-yellow-400 rounded-full"></div>
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
                      className={`w-12 h-12 rounded-full border-2 font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-orange-500 bg-orange-500 text-white'
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
                <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                <div className="grid grid-cols-4 gap-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="text-center">
                      <div className="w-14 h-14 bg-gray-100 rounded-lg mb-2 mx-auto flex items-center justify-center">
                        <img 
                          src={ingredient.image} 
                          alt={ingredient.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      </div>
                      <p className="text-xs text-gray-600">{ingredient.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes/Allergies */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Notes / Allergies</h3>
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
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total price</p>
                    <p className="text-xl font-bold">750 DA</p>
                  </div>
                  <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Add to order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - Related items */}
        <div className="p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">You might also like</h3>
            <button className="text-sm text-orange-500 hover:text-orange-600">
              See more meals →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sample related items */}
            <div className="bg-white rounded-lg p-4 flex gap-4 items-center">
              <img 
                src="/api/placeholder/80/80" 
                alt="Spaghetti Bolognese"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold">Spaghetti Bolognese</h4>
                <p className="text-sm text-gray-500">Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">1000</span>
                  <button className="px-3 py-1 bg-black text-white text-sm rounded-full">
                    more →
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 flex gap-4 items-center">
              <img 
                src="/api/placeholder/80/80" 
                alt="Spaghetti Bolognese"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold">Spaghetti Bolognese</h4>
                <p className="text-sm text-gray-500">Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">1000</span>
                  <button className="px-3 py-1 bg-black text-white text-sm rounded-full">
                    more →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;