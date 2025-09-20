import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../comp/Nav';
import burger from '../../assets/images/burger.png';
const MealStatisticDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;

  // Mock meal data - in real app, fetch based on id
  const meal = {
    id: 1,
    name: 'Vegetarian Pizza',
    image: '/api/placeholder/200/200',
    rating: 4.8,
    totalCost: '---- DA',
    estimatedProfit: '---- DA',
    actualProfit: '---- DA',
    status: 'Profit'
  };

  // Income list data
  const [incomeList] = useState([
    { id: 1, source: 'Netouessi', amount: '3600 DA', isSelected: true },
    { id: 2, source: 'Tamelessi', amount: '3600 DA', isSelected: false },
    { id: 3, source: 'Larouss', amount: '3600 DA', isSelected: false },
    { id: 4, source: 'Sidi', amount: '', isSelected: false }
  ]);

  // Reviews data
  const [reviews] = useState([
    {
      id: 1,
      customerName: 'Floyd Miles',
      customerImage: '/api/placeholder/40/40',
      rating: 3,
      reviewText: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      foodImages: [
        '/api/placeholder/60/60',
        '/api/placeholder/60/60',
        '/api/placeholder/60/60',
        '/api/placeholder/60/60',
        '/api/placeholder/60/60',
        '/api/placeholder/60/60'
      ]
    },
    {
      id: 2,
      customerName: 'Floyd Miles',
      customerImage: '/api/placeholder/40/40',
      rating: 3,
      reviewText: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      foodImages: [
        '/api/placeholder/60/60',
        '/api/placeholder/60/60',
        '/api/placeholder/60/60',
        '/api/placeholder/60/60',
        '/api/placeholder/60/60',
        '/api/placeholder/60/60'
      ]
    }
  ]);

  // Pagination for reviews
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-orange-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="flex bg-[#FFFBF8] min-h-screen">
      <Nav />
      
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{meal.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium text-gray-900">{meal.rating}</span>
              <div className="flex items-center">
                {renderStars(Math.floor(meal.rating))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex gap-8">
            {/* Left Column - Image and Income */}
            <div className="w-80 space-y-6">
              {/* Meal Image */}
              <div className="relative">
                <img
                  src={burger}
                  alt={meal.name}
                  className="w-72 h-72 rounded-lg object-cover"
                />
                <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Income Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Income</h2>
                
                {/* Income Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total cost</p>
                    <p className="text-lg font-medium text-gray-900">{meal.totalCost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated profit</p>
                    <p className="text-lg font-medium text-gray-900">{meal.estimatedProfit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Actual profit</p>
                    <p className="text-lg font-medium text-gray-900">{meal.actualProfit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {meal.status}
                    </span>
                  </div>
                </div>

                {/* Income List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-md font-medium text-gray-900">Income list</h3>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  <div className="space-y-3">
                    {incomeList.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
                            item.isSelected ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                          }`}>
                            {item.isSelected && (
                              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="text-gray-900">{item.source}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-900 font-medium">{item.amount}</span>
                          <button className="text-orange-500 hover:text-orange-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Reviews */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                  Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">
                    List View
                  </button>
                  <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded">
                    Card View
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {currentReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.customerImage}
                          alt={review.customerName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{review.customerName}</h4>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {review.reviewText}
                    </p>

                    {/* Food Images */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {review.foodImages.slice(0, 4).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Food ${index + 1}`}
                          className="w-full h-16 object-cover rounded"
                        />
                      ))}
                    </div>
                    {review.foodImages.length > 4 && (
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {review.foodImages.slice(4, 6).map((image, index) => (
                          <img
                            key={index + 4}
                            src={image}
                            alt={`Food ${index + 5}`}
                            className="w-full h-16 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4].map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-6 h-6 flex items-center justify-center text-xs rounded ${
                        pageNumber === currentPage
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <span className="text-gray-400 text-xs">...</span>
                  <button className="w-6 h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100 rounded">
                    25
                  </button>
                </div>
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
                >
                  Next
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealStatisticDetails;