import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../comp/Nav';

const StatisticAI = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Chart data
  const incomeData = [
    { name: 'Jan', value: 180000 },
    { name: 'Feb', value: 200000 },
    { name: 'Mar', value: 190000 },
    { name: 'Apr', value: 220000 },
    { name: 'May', value: 210000 },
    { name: 'Jun', value: 240000 },
  ];

  const outcomeData = [
    { name: 'Jan', value: 150000 },
    { name: 'Feb', value: 160000 },
    { name: 'Mar', value: 145000 },
    { name: 'Apr', value: 170000 },
    { name: 'May', value: 155000 },
    { name: 'Jun', value: 165000 },
  ];

  // Mock data for the stats
  const stats = [
    {
      title: 'Income',
      value: '120000.00',
      unit: 'DA',
      icon: '💰',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Outcome',
      value: '120000.00',
      unit: 'DA',
      icon: '📉',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      title: 'Conversion rate',
      value: '5.10',
      unit: '%',
      icon: '📊',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      title: 'Employees',
      value: '20',
      unit: 'employee',
      icon: '👥',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    }
  ];

  // Mock data for meals
  const [meals] = useState([
    {
      id: 1,
      type: 'Pizza',
      name: 'Burger Classique',
      description: 'Pain hamburger Sauce mayo 100g, fromage cheddar...',
      image: '/api/placeholder/60/60',
      income: '1000 DA',
      outcome: '1000 DA',
      benefit: '1000 DA',
      reviews: 4.8,
      status: 'Profit'
    },
    {
      id: 2,
      type: 'Pizza',
      name: 'Burger Classique',
      description: 'Pain hamburger Sauce mayo 100g, fromage cheddar...',
      image: '/api/placeholder/60/60',
      income: '1000 DA',
      outcome: '1250 DA',
      benefit: '1000 DA',
      reviews: 4.8,
      status: 'Loss'
    },
    {
      id: 3,
      type: 'Pizza',
      name: 'Burger Classique',
      description: 'Pain hamburger Sauce mayo 100g, fromage cheddar...',
      image: '/api/placeholder/60/60',
      income: '1000 DA',
      outcome: '1000 DA',
      benefit: '1000 DA',
      reviews: 4.8,
      status: 'Profit'
    },
    {
      id: 4,
      type: 'Pizza',
      name: 'Burger Classique',
      description: 'Pain hamburger Sauce mayo 100g, fromage cheddar...',
      image: '/api/placeholder/60/60',
      income: '1000 DA',
      outcome: '1000 DA',
      benefit: '1000 DA',
      reviews: 4.8,
      status: 'Profit'
    },
    {
      id: 5,
      type: 'Pizza',
      name: 'Burger Classique',
      description: 'Pain hamburger Sauce mayo 100g, fromage cheddar...',
      image: '/api/placeholder/60/60',
      income: '1000 DA',
      outcome: '1250 DA',
      benefit: '1000 DA',
      reviews: 4.8,
      status: 'Loss'
    },
    {
      id: 6,
      type: 'Pizza',
      name: 'Burger Classique',
      description: 'Pain hamburger Sauce mayo 100g, fromage cheddar...',
      image: '/api/placeholder/60/60',
      income: '1000 DA',
      outcome: '1000 DA',
      benefit: '1000 DA',
      reviews: 4.8,
      status: 'Profit'
    }
  ]);

  // Pagination
  const totalPages = Math.ceil(meals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMeals = meals.slice(startIndex, startIndex + itemsPerPage);

  const renderStars = (rating) => {
    return rating.toFixed(1);
  };

  // Custom Chart Component
  const CustomLineChart = ({ data, color, bgColor }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className={`h-48 ${bgColor} rounded-lg p-4 relative`}>
        <div className="h-full flex items-end justify-between relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>{Math.round(maxValue/1000)}k</span>
            <span>{Math.round(maxValue/2000)}k</span>
            <span>0</span>
          </div>
          
          {/* Chart bars and line */}
          <div className="flex-1 ml-8 h-full relative flex items-end justify-between">
            {data.map((item, index) => {
              const height = (item.value / maxValue) * 100;
              return (
                <div key={index} className="flex flex-col items-center">
                  {/* Data point */}
                  <div 
                    className={`w-2 ${color} rounded-t-sm mb-2`}
                    style={{ height: `${height}%` }}
                  ></div>
                  {/* X-axis label */}
                  <span className="text-xs text-gray-500 mt-2">{item.name}</span>
                </div>
              );
            })}
            
            {/* Connecting line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <polyline
                points={data.map((item, index) => {
                  const x = (index / (data.length - 1)) * 100;
                  const y = 100 - (item.value / maxValue) * 80;
                  return `${x}%,${y}%`;
                }).join(' ')}
                fill="none"
                stroke={color === 'bg-green-500' ? '#22c55e' : '#ef4444'}
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex bg-[#FFFBF8] min-h-screen">
      <Nav />
      
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Statistic & AI</h1>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <span className="text-lg">{stat.icon}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value} <span className="text-sm font-normal text-gray-500">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg p-6 border-2 border-blue-400">
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Income Chart */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Income</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>day</span>
                  <span>week</span>
                  <span className="font-medium">month</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <CustomLineChart 
                data={incomeData} 
                color="bg-green-500" 
                bgColor="bg-green-50" 
              />
              <div className="mt-2 text-sm font-medium text-gray-900">200000 Da per week</div>
            </div>

            {/* Outcome Chart */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Outcome</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>day</span>
                  <span>week</span>
                  <span className="font-medium">month</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <CustomLineChart 
                data={outcomeData} 
                color="bg-red-500" 
                bgColor="bg-red-50" 
              />
              <div className="mt-2 text-sm font-medium text-gray-900">200000 Da per week</div>
            </div>
          </div>

          {/* Most Benefits Meals Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Most benefits meals</h3>
              <button 
                onClick={() => navigate('/admin/add-statistic')}
                className="flex items-center px-4 py-2 text-orange-500 hover:text-orange-600 font-medium text-sm"
              >
                <span>Add statistic for a meal</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 rounded-t-lg text-sm font-medium text-gray-700">
              <div>Food</div>
              <div>Income</div>
              <div>Outcome</div>
              <div>Benefit</div>
              <div>Reviews</div>
              <div>Status</div>
              <div></div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {currentMeals.map((meal) => (
                <div key={meal.id} className="grid grid-cols-7 gap-4 p-4 items-center">
                  {/* Food */}
                  <div 
                    className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2"
                    onClick={() => navigate(`/admin/meal-statistic/${meal.id}`)}
                  >
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-12 h-12 rounded-lg object-cover mr-3"
                    />
                    <div>
                      <div className="text-sm text-gray-500">{meal.type}</div>
                      <div className="font-medium text-gray-900">{meal.name}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[150px]">
                        {meal.description}
                      </div>
                    </div>
                  </div>

                  {/* Income */}
                  <div className="text-sm text-gray-900">{meal.income}</div>

                  {/* Outcome */}
                  <div className="text-sm text-gray-900">{meal.outcome}</div>

                  {/* Benefit */}
                  <div className="text-sm text-gray-900">{meal.benefit}</div>

                  {/* Reviews */}
                  <div className="text-sm text-gray-900">{renderStars(meal.reviews)}</div>

                  {/* Status */}
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        meal.status === 'Profit'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {meal.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
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
                {[1, 2, 3, 4, 5].map((pageNumber) => (
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
                ))}
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
    </div>
  );
};

export default StatisticAI;