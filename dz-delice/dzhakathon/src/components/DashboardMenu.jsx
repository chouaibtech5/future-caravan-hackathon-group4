import React, { useState } from 'react';
import fotter from '../assets/images/footer.png';

const DashboardMenu = ({ onNavigateToProduct }) => {
  
  // Sample data for menu items (matching the admin design)
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
    { id: 'burger', name: 'Burger' },
    { id: 'pasta', name: 'Pasta' }
  ];

  // State for active category
  const [activeCategory, setActiveCategory] = useState('pizza');

  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

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
          </div>
          <button 
            onClick={() => {
              onNavigateToProduct();
            }}
            className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 mr-5"
          >
            more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* Meal Category Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-black">Meal category</h2>
          <span className="text-sm text-gray-500">
            If you want different size of the same order you have to make two orders and do not increment the number!
          </span>
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
        <h3 className="text-xl font-semibold text-black mb-6">
          {activeCategory === 'pizza' && 'Pizza'}
          {activeCategory === 'burger' && 'Burgers'}
          {activeCategory === 'pasta' && 'Pasta'}
          {activeCategory === 'all' && 'All Items'}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button className="text-gray-500 hover:text-gray-700">
          &lt; Previous
        </button>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded bg-orange-500 text-white">1</button>
          <button className="w-8 h-8 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">2</button>
          <button className="w-8 h-8 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">3</button>
          <button className="w-8 h-8 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">4</button>
          <span className="w-8 h-8 flex items-center justify-center">...</span>
          <button className="w-8 h-8 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">25</button>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default DashboardMenu;