import React, { useState } from 'react';
import Nav from '../comp/Nav';

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  // Mock review data - replace with real data from your backend
  const [reviews] = useState([
    {
      id: 1,
      customerName: 'Floyd Miles',
      customerImage: '/api/placeholder/40/40',
      rating: 3,
      reviewText: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet si...',
      foodImages: [
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80'
      ],
      date: '2024-03-21'
    },
    {
      id: 2,
      customerName: 'Floyd Miles',
      customerImage: '/api/placeholder/40/40',
      rating: 3,
      reviewText: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet si...',
      foodImages: [
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80'
      ],
      date: '2024-03-21'
    },
    {
      id: 3,
      customerName: 'Floyd Miles',
      customerImage: '/api/placeholder/40/40',
      rating: 3,
      reviewText: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet si...',
      foodImages: [
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80'
      ],
      date: '2024-03-21'
    },
    {
      id: 4,
      customerName: 'Floyd Miles',
      customerImage: '/api/placeholder/40/40',
      rating: 3,
      reviewText: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet si...',
      foodImages: [
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80'
      ],
      date: '2024-03-21'
    },
    {
      id: 5,
      customerName: 'Floyd Miles',
      customerImage: '/api/placeholder/40/40',
      rating: 3,
      reviewText: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet si...',
      foodImages: [
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80'
      ],
      date: '2024-03-21'
    },
    {
      id: 6,
      customerName: 'Floyd Miles',
      customerImage: '/api/placeholder/40/40',
      rating: 3,
      reviewText: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet si...',
      foodImages: [
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80'
      ],
      date: '2024-03-21'
    },
    {
      id: 7,
      customerName: 'Floyd Miles',
      customerImage: '/api/placeholder/40/40',
      rating: 3,
      reviewText: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet si...',
      foodImages: [
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80',
        '/api/placeholder/80/80'
      ],
      date: '2024-03-21'
    }
  ]);

  // Filter reviews based on search term
  const filteredReviews = reviews.filter(review =>
    review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.reviewText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

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

  // Card View Component (Fixed layout to match the screenshot)
  const ReviewCard = ({ review }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header with profile image on left and stars on right */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <img
            src={review.customerImage}
            alt={review.customerName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-medium text-gray-900">{review.customerName}</h3>
          </div>
        </div>
        <div className="flex items-center">
          {renderStars(review.rating)}
        </div>
      </div>
      
      {/* Review text */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {review.reviewText}
      </p>
      
      {/* Food images grid - 4 per row as shown in screenshot */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {review.foodImages.slice(0, 4).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Food ${index + 1}`}
            className="w-full h-16 object-cover rounded-lg"
          />
        ))}
      </div>
      
      {/* Additional row for remaining images if more than 4 */}
      {review.foodImages.length > 4 && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {review.foodImages.slice(4, 6).map((image, index) => (
            <img
              key={index + 4}
              src={image}
              alt={`Food ${index + 5}`}
              className="w-full h-16 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
      
      {/* See more button aligned to left */}
      <div className="flex items-center justify-start">
        <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          See more
        </button>
      </div>
    </div>
  );

  // List View Component - REMOVED

  return (
    <div className="flex bg-[#FFFBF8] min-h-screen">
      <Nav />
      
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="bg-white rounded-lg p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900">Reviews About The Restaurant</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-orange-500 text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
                Card View
              </button>
            </div>
          </div>

          {/* Reviews Content - Card View Only */}
          <div className="min-h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
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
              {Array.from({ length: Math.min(totalPages, 4) }, (_, index) => {
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

export default Reviews;