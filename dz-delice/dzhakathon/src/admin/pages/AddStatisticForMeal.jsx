import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../comp/Nav';

const AddStatisticForMeal = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Categories
  const categories = ['All', 'Pizza', 'Burgers', 'Pasta'];

  // Mock meal data
  const [meals] = useState([
    // Pizza Category
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onions, parmesan cheese.',
      price: 1000,
      category: 'Pizza',
      image: '/api/placeholder/120/120'
    },
    {
      id: 2,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onions, parmesan cheese.',
      price: 1000,
      category: 'Pizza',
      image: '/api/placeholder/120/120'
    },
    {
      id: 3,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onions, parmesan cheese.',
      price: 1000,
      category: 'Pizza',
      image: '/api/placeholder/120/120'
    },
    {
      id: 4,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onions, parmesan cheese.',
      price: 1000,
      category: 'Pizza',
      image: '/api/placeholder/120/120'
    },
    {
      id: 5,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onions, parmesan cheese.',
      price: 1000,
      category: 'Pizza',
      image: '/api/placeholder/120/120'
    },
    {
      id: 6,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onions, parmesan cheese.',
      price: 1000,
      category: 'Pizza',
      image: '/api/placeholder/120/120'
    },
    // Burgers Category
    {
      id: 7,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onions, parmesan cheese.',
      price: 1000,
      category: 'Burgers',
      image: '/api/placeholder/120/120'
    },
    {
      id: 8,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onions, parmesan cheese.',
      price: 1000,
      category: 'Burgers',
      image: '/api/placeholder/120/120'
    },
    {
      id: 9,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onions, parmesan cheese.',
      price: 1000,
      category: 'Burgers',
      image: '/api/placeholder/120/120'
    },
    {
      id: 10,
      name: 'Spaghetti Bolognese',
      description: 'Spaghetti, ground beef, tomato sauce, garlic, onions, parmesan cheese.',
      price: 1000,
      category: 'Burgers',
      image: '/api/placeholder/120/120'
    }
  ]);

  // Filter meals based on selected category
  const filteredMeals = selectedCategory === 'All' 
    ? meals 
    : meals.filter(meal => meal.category === selectedCategory);

  // Pagination
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMeals = filteredMeals.slice(startIndex, startIndex + itemsPerPage);

  // Group meals by category for display
  const groupedMeals = currentMeals.reduce((acc, meal) => {
    if (!acc[meal.category]) {
      acc[meal.category] = [];
    }
    acc[meal.category].push(meal);
    return acc;
  }, {});

  const handleAddStatistic = (mealId) => {
    // Navigate to meal statistic details page
    navigate(`/admin/meal-statistic/${mealId}`);
  };

  const MealCard = ({ meal }) => (
    <div className="bg-white rounded-[200px] border border-gray-200 p-4">
      <div className="flex items-start gap-4">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0 ml-7"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{meal.name}</h3>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            {meal.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">{meal.price}</span>
            <button
              onClick={() => handleAddStatistic(meal.id)}
              className="px-4 py-1 mr-7 bg-gray-900 text-white text-sm rounded-[100px] hover:bg-gray-800 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-[#FFFBF8] min-h-screen">
      <Nav />
      
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/statistics')}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Add statistic for a meal</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg p-6">
          {/* Meal Category Filters */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Meal category</h2>
            <div className="flex gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Meals Grid */}
          <div className="space-y-8">
            {selectedCategory === 'All' ? (
              // Show by categories when "All" is selected
              Object.entries(groupedMeals).map(([category, categoryMeals]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{category}</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {categoryMeals.map((meal) => (
                      <MealCard key={meal.id} meal={meal} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Show single category
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{selectedCategory}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {currentMeals.map((meal) => (
                    <MealCard key={meal.id} meal={meal} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 flex items-center justify-center text-sm rounded-md ${
                      pageNumber === currentPage
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-gray-400">...</span>
                  <button
                    onClick={() => setCurrentPage(25)}
                    className={`w-8 h-8 flex items-center justify-center text-sm rounded-md ${
                      25 === currentPage
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    25
                  </button>
                </>
              )}
            </div>
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStatisticForMeal;