import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

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
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Dz</span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-black">Dz</span>
                <span className="text-orange-500">Délice</span>
              </span>
            </div>
            <span className="text-gray-600">Menu Management</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
              />
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="bg-white border-2 border-blue-300 rounded-lg p-8">
          {/* Product Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Vegetarian Pizza</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">4.8</span>
                <div className="flex text-orange-400">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side - Image */}
            <div className="relative">
              <img 
                src="/api/placeholder/500/500" 
                alt="Vegetarian Pizza"
                className="w-full h-96 object-cover rounded-2xl"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-500 rounded-full"></div>
              <div className="absolute top-1/2 -left-6 w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>

            {/* Right side - Details */}
            <div className="space-y-8">
              {/* Points and Description */}
              <div>
                <p className="text-sm text-gray-500 mb-3">5 points</p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  <strong>Ingredients:</strong> Mozzarella, gorgonzola, parmesan, ricotta Rich, cheesy flavor
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Size</h3>
                <div className="flex gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-full border-2 font-medium transition-colors ${
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
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <div className="grid grid-cols-4 gap-4">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg mb-2 mx-auto flex items-center justify-center">
                        <img 
                          src={ingredient.image} 
                          alt={ingredient.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{ingredient.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes/Allergies */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Notes / Allergies</h3>
                <p className="text-gray-600">No parmesan , Allergy from ...</p>
              </div>

              {/* Agreement checkbox */}
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="agreement" 
                  className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="agreement" className="text-gray-600">
                  I agree to terms and policies once true mail BE-001
                </label>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-xl"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-xl"
                  >
                    +
                  </button>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Full price</p>
                    <p className="text-2xl font-bold">750 DA</p>
                    <p className="text-sm text-gray-500">I add to order</p>
                  </div>
                  <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-lg">
                    Add to order
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Items Section */}
          <div className="mt-16 pt-8 border-t">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-semibold">Related Items</h3>
              <button className="text-orange-500 hover:text-orange-600 flex items-center gap-2">
                See more meals
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedItems.map((item) => (
                <div key={item.id} className="bg-white rounded-[100px] border border-gray-200 p-4 flex gap-4 items-center">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">{item.price}</span>
                      <button className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2">
                        more
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;