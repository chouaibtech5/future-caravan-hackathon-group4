import React, { useState } from 'react';
import Nav from '../comp/Nav';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('chef');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sample notifications data
  const chefNotifications = [
    { id: 1, type: 'Order completed', table: 7, time: '5 min', status: 'completed' },
    { id: 2, type: 'Order Canceled', table: 7, time: '5 min', status: 'canceled' },
    { id: 3, type: 'Asking for server', table: 7, time: '5 min', status: 'asking' },
    { id: 4, type: 'Order completed', table: 7, time: '5 min', status: 'completed' },
    { id: 5, type: 'Order Canceled', table: 7, time: '5 min', status: 'canceled' },
    { id: 6, type: 'Asking for server', table: 7, time: '5 min', status: 'asking' },
    { id: 7, type: 'Order completed', table: 7, time: '5 min', status: 'completed' },
    { id: 8, type: 'Order Canceled', table: 7, time: '5 min', status: 'canceled' },
    { id: 9, type: 'Asking for server', table: 7, time: '5 min', status: 'asking' },
    { id: 10, type: 'Order completed', table: 7, time: '5 min', status: 'completed' },
    { id: 11, type: 'Order Canceled', table: 7, time: '5 min', status: 'canceled' },
    { id: 12, type: 'Asking for server', table: 7, time: '5 min', status: 'asking' },
  ];

  const serverNotifications = [
    { id: 1, type: 'New order', table: 7, time: '5 min', status: 'new' },
    { id: 2, type: 'Order Canceled', table: 7, time: '5 min', status: 'canceled' },
    { id: 3, type: 'New order', table: 7, time: '5 min', status: 'new' },
    { id: 4, type: 'Order Canceled', table: 7, time: '5 min', status: 'canceled' },
    { id: 5, type: 'New order', table: 7, time: '5 min', status: 'new' },
    { id: 6, type: 'Order Canceled', table: 7, time: '5 min', status: 'canceled' },
    { id: 7, type: 'New order', table: 7, time: '5 min', status: 'new' },
    { id: 8, type: 'Order Canceled', table: 7, time: '5 min', status: 'canceled' },
  ];

  const currentNotifications = activeTab === 'chef' ? chefNotifications : serverNotifications;
  const totalPages = Math.ceil(currentNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = currentNotifications.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'canceled':
        return 'text-red-600';
      case 'asking':
        return 'text-orange-500';
      case 'new':
        return 'text-orange-500';
      default:
        return 'text-gray-600';
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Nav />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg">
            {/* Tab Navigation */}
            <div className="flex items-center justify-center border-b border-gray-200 p-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleTabChange('chef')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'chef'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Chef / Cooker
                </button>
                <button
                  onClick={() => handleTabChange('server')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'server'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Server
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="p-6">
              <div className="space-y-4">
                {currentItems.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-medium ${getStatusColor(notification.status)}`}>
                        {notification.type}
                      </span>
                      <span className="text-sm text-gray-600">
                        - table {notification.table}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button className="text-sm text-gray-600 hover:text-gray-800 underline">
                        see order details
                      </button>
                      <span className="text-sm text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
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
                      className={`w-8 h-8 flex items-center justify-center text-sm rounded ${
                        pageNumber === currentPage
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <span className="text-gray-400 text-sm px-2">...</span>
                  <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-100 rounded">
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

export default Notifications;