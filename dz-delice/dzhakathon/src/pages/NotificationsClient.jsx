import { useState, useEffect } from "react";

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order_prepared",
      title: "Order Prepared",
      description: "Table 7 - 4 items",
      time: "2 min ago",
      status: "prepared",
      read: false
    },
    {
      id: 2,
      type: "order_canceled",
      title: "Order Canceled",
      description: "Table 3 - 2 items",
      time: "5 min ago",
      status: "canceled",
      read: false
    },
    {
      id: 3,
      type: "special_offer",
      title: "Weekly Winner! 🎉",
      description: "Congratulations! You've been selected as this week's top performer!",
      details: "Claim your special bonus offer before it expires.",
      time: "10 min ago",
      status: "special",
      read: false
    },
    {
      id: 4,
      type: "order_prepared",
      title: "Order Prepared",
      description: "Table 5 - 3 items",
      time: "12 min ago",
      status: "prepared",
      read: true
    },
    {
      id: 5,
      type: "order_ready",
      title: "Order Ready for Pickup",
      description: "Takeaway order #1257",
      time: "15 min ago",
      status: "ready",
      read: true
    },
    {
      id: 6,
      type: "order_canceled",
      title: "Order Canceled",
      description: "Table 2 - 1 item",
      time: "25 min ago",
      status: "canceled",
      read: true
    },
    {
      id: 7,
      type: "order_prepared",
      title: "Order Prepared",
      description: "Table 9 - 6 items",
      time: "35 min ago",
      status: "prepared",
      read: true
    },
    {
      id: 8,
      type: "new_review",
      title: "New Review Received",
      description: "Customer left a 5-star rating!",
      time: "1 hour ago",
      status: "review",
      read: true
    },
    {
      id: 9,
      type: "order_processing",
      title: "Order in Progress",
      description: "Your plate is under preparation",
      time: "Just now",
      status: "processing",
      read: false
    },
    {
      id: 10,
      type: "order_confirmed",
      title: "Order Confirmed",
      description: "We've successfully received your order",
      details: "You'll receive it in approximately 20 minutes",
      time: "5 min ago",
      status: "confirmed",
      read: false
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const itemsPerPage = 6;
  
  // Filter notifications based on search and status filter
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  const getCurrentPageNotifications = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredNotifications.slice(startIndex, endIndex);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "prepared":
        return "bg-green-100 text-green-800 border-green-300";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-300";
      case "ready":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "special":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-amber-800 border-amber-300";
      case "review":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "processing":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "confirmed":
        return "bg-teal-100 text-teal-800 border-teal-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "prepared":
        return "✅";
      case "canceled":
        return "❌";
      case "ready":
        return "🛵";
      case "special":
        return "🎉";
      case "review":
        return "⭐";
      case "processing":
        return "👨‍🍳";
      case "confirmed":
        return "📋";
      default:
        return "📋";
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({...notification, read: true})));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Add current page and surrounding pages
    if (currentPage > 3) {
      pages.push("...");
    }
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    // Add last page if there are multiple pages
    if (totalPages > 1) {
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-500 mt-1">{filteredNotifications.length} notifications</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search notifications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="prepared">Prepared</option>
            <option value="canceled">Canceled</option>
            <option value="ready">Ready</option>
            <option value="special">Special</option>
            <option value="processing">Processing</option>
            <option value="confirmed">Confirmed</option>
          </select>
          
          <button 
            onClick={markAllAsRead}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            Mark all as read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 mb-8">
        {getCurrentPageNotifications().length > 0 ? (
          getCurrentPageNotifications().map((notification) => (
            <div 
              key={notification.id} 
              className={`flex items-start p-4 rounded-xl transition-all border-l-4 ${
                notification.read ? 'bg-gray-50 border-gray-200' : 'bg-white shadow-sm'
              } ${getStatusColor(notification.status)}`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="flex-shrink-0 mr-3 text-xl mt-0.5">
                {getStatusIcon(notification.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                    {notification.title}
                    {!notification.read && (
                      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-orange-500"></span>
                    )}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notification.time}</span>
                </div>
                
                <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                  {notification.description}
                </p>
                
                {notification.details && (
                  <p className="text-sm text-gray-600 mt-2 bg-white/50 p-2 rounded-lg border border-gray-200">
                    {notification.details}
                  </p>
                )}
                
                {notification.status === "special" && (
                  <button className="mt-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all shadow-md">
                    Claim Your Reward Now
                  </button>
                )}
                
                {(notification.status === "processing" || notification.status === "confirmed") && (
                  <div className="mt-3 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          notification.status === "processing" ? "bg-indigo-500 w-3/5" : "bg-teal-500 w-4/5"
                        }`}
                      ></div>
                    </div>
                    <span className="ml-3 text-xs text-gray-500">
                      {notification.status === "processing" ? "Preparing..." : "Almost ready!"}
                    </span>
                  </div>
                )}
              </div>
              
              <button className="text-gray-400 hover:text-orange-500 ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-gray-500">No notifications found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredNotifications.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Previous</span>
          </button>

          <div className="flex items-center space-x-1">
            {renderPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={typeof page !== 'number'}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  page === currentPage
                    ? 'bg-orange-500 text-white shadow-md'
                    : typeof page === 'number'
                    ? 'text-gray-600 hover:bg-gray-100'
                    : 'text-gray-400 cursor-default'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <span className="text-sm">Next</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}