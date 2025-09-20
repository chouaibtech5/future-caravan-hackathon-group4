import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../comp/Nav';

const AddMeal = () => {
  const navigate = useNavigate();
  
  const [mealData, setMealData] = useState({
    name: '',
    ingredients: '',
    type: 'Pizza',
    sizes: {
      S: { price: '2000', selected: true },
      M: { price: '2000', selected: false },
      L: { price: '2000', selected: false },
      XL: { price: '2000', selected: false },
      XXL: { price: '2000', selected: false },
      XXXL: { price: '2000', selected: false }
    }
  });

  const handleSizeToggle = (size) => {
    setMealData(prev => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: { ...prev.sizes[size], selected: !prev.sizes[size].selected }
      }
    }));
  };

  const handlePriceChange = (size, price) => {
    setMealData(prev => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: { ...prev.sizes[size], price: price }
      }
    }));
  };

  return (
    <div className="flex bg-[#FFFBF8] min-h-screen">
      <Nav />
      
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="p-6 mb-6">
          <div className="flex bg-white rounded-lg items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
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
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg p-8">
          {/* Meal Category Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-black">Meal category</h2>
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
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
                burger
              </button>
              <button className="px-6 py-3 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
                Pasta
              </button>
            </div>

            {/* Info text */}
            <p className="text-gray-500 text-sm mb-8">
              ! If you want different size of the same order you have to make two orders and do not increment the number !
            </p>
          </div>

          {/* Add Meal Form */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left side - Image upload */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 h-80 flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-orange-500 font-medium mb-2 text-lg">Click to upload</p>
                <p className="text-gray-500 text-sm">JPG, JPEG, PNG less than 2MB</p>
              </div>
            </div>

            {/* Right side - Form fields */}
            <div className="space-y-6">
              {/* Header with back arrow */}
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => navigate('/admin/menu')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <h2 className="text-2xl font-bold text-black">Meal name here ...</h2>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-gray-600 mb-2">
                  <span className="font-medium text-black">Ingredients:</span> 
                  <span className="text-gray-400 ml-1">add ingredients here ...</span>
                </label>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-semibold text-black mb-4">Size</h3>
                <div className="flex gap-3 mb-6">
                  {Object.keys(mealData.sizes).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`w-24 h-12 rounded-[200px] border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                        mealData.sizes[size].selected
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <h3 className="font-semibold text-black mb-3">Type</h3>
                <div className="relative">
                  <select 
                    value={mealData.type}
                    onChange={(e) => setMealData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-4 border border-gray-300 rounded-[100px] appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Pizza">Pizza</option>
                    <option value="Burger">Burger</option>
                    <option value="Pasta">Pasta</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Size's price */}
              <div>
                <h3 className="font-semibold text-black mb-4">Size's price</h3>
                <div className="space-y-3">
                  {Object.entries(mealData.sizes).map(([size, data]) => (
                    <div key={size} className="flex items-center gap-4">
                      <div className="w-12 h-10 border-gray-500 rounded-[100px] flex items-center justify-center text-sm font-medium text-gray-600">
                        {size}
                      </div>
                      <input
                        type="text"
                        value={`${data.price} DA`}
                        onChange={(e) => {
                          const value = e.target.value.replace(' DA', '');
                          handlePriceChange(size, value);
                        }}
                        className="flex-1 p-3 border border-gray-300 rounded-[200px] focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => navigate('/admin/menu')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Save Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;