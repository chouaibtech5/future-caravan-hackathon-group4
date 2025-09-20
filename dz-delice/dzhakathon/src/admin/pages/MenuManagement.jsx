import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../comp/Nav';
import fotter from '../../assets/images/footer.png';

const MenuManagement = () => {
  const navigate = useNavigate();
  
  // Sample data for menu items
  const [menuItems] = useState([
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan',
      price: 1000,
      category: 'pizza',
      image: fotter,
      status: 'available'
    },
    {
      id: 2,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan',
      price: 1000,
      category: 'pizza',
      image: fotter,
      status: 'available'
    },
    {
      id: 3,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan',
      price: 1000,
      category: 'pizza',
      image: fotter,
      status: 'available'
    },
    {
      id: 4,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan',
      price: 1000,
      category: 'pizza',
      image: fotter,
      status: 'available'
    },
    {
      id: 5,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan',
      price: 1000,
      category: 'pizza',
      image: fotter,
      status: 'available'
    },
    {
      id: 6,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan',
      price: 1000,
      category: 'pizza',
      image: fotter,
      status: 'available'
    },
    {
      id: 7,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan',
      price: 1000,
      category: 'burger',
      image: fotter,
      status: 'available'
    },
    {
      id: 8,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onion, parmesan',
      price: 1000,
      category: 'pasta',
      image: fotter,
      status: 'available'
    }
  ]);

  // Categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'burger', name: 'burger' },
    { id: 'pasta', name: 'Pasta' }
  ];

  // State for active category
  const [activeCategory, setActiveCategory] = useState('pizza');

  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Navigate to Add Meal page
  const handleAddMeal = () => {
    navigate('/admin/add-meal');
  };

  // Render menu item card
  const MenuItemCard = ({ item }) => (
    <div className="bg-white rounded-[100px] border border-gray-200 p-4 flex gap-4 items-center">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-30 h-30 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-black text-lg mb-1">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-3 leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-black text-lg">{item.price}</span>
            <span className="text-gray-400 text-sm">DA</span>
          </div>
          <button className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 mr-5">
            Edit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

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
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Container with Blue Border */}
        <div className="bg-white border-2 border-blue-300 rounded-lg p-8">
          {/* Meal Category Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-black">Meal category</h2>
              <button 
                onClick={handleAddMeal}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 font-medium"
              >
                Add new meal
                <span className="text-lg">+</span>
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pizza Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-black mb-6">Pizza</h3>
            <div className="grid grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;