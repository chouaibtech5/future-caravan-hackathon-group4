import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Historic() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all"); // all, delivered, cancelled

  // Sample order history data
  const orderHistory = [
    {
      id: "ORD-7892",
      date: "2023-11-15",
      status: "Delivered",
      items: [
        { name: "Chicken Burger", price: 8.99, quantity: 2, category: "Burgers" },
        { name: "French Fries", price: 3.50, quantity: 1, category: "Sides" },
        { name: "Coca Cola", price: 2.00, quantity: 2, category: "Drinks" }
      ],
      total: 25.98,
      deliveryAddress: "123 Main St, Cityville",
      paymentMethod: "Credit Card",
      rating: 4.5
    },
    {
      id: "ORD-6541",
      date: "2023-11-10",
      status: "Delivered",
      items: [
        { name: "Vegetable Pizza", price: 15.50, quantity: 1, category: "Pizza" },
        { name: "Garlic Bread", price: 4.50, quantity: 1, category: "Sides" }
      ],
      total: 20.00,
      deliveryAddress: "456 Oak Ave, Townsville",
      paymentMethod: "PayPal",
      rating: 4.0
    },
    {
      id: "ORD-5214",
      date: "2023-11-05",
      status: "Cancelled",
      items: [
        { name: "Beef Shawarma", price: 9.99, quantity: 3, category: "Middle Eastern" },
        { name: "Hummus Plate", price: 6.50, quantity: 1, category: "Appetizers" }
      ],
      total: 36.47,
      deliveryAddress: "789 Pine Rd, Villageton",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-3987",
      date: "2023-10-28",
      status: "Delivered",
      items: [
        { name: "Caesar Salad", price: 8.75, quantity: 2, category: "Salads" },
        { name: "Grilled Chicken", price: 5.25, quantity: 2, category: "Mains" },
        { name: "Lemonade", price: 3.00, quantity: 2, category: "Drinks" }
      ],
      total: 34.00,
      deliveryAddress: "123 Main St, Cityville",
      paymentMethod: "Cash on Delivery",
      rating: 5.0
    },
    {
      id: "ORD-2654",
      date: "2023-10-20",
      status: "Delivered",
      items: [
        { name: "Sushi Platter", price: 22.99, quantity: 1, category: "Japanese" },
        { name: "Miso Soup", price: 3.50, quantity: 2, category: "Soups" },
        { name: "Green Tea", price: 2.50, quantity: 2, category: "Drinks" }
      ],
      total: 34.49,
      deliveryAddress: "456 Oak Ave, Townsville",
      paymentMethod: "Credit Card",
      rating: 4.5
    }
  ];

  // Calculate user insights
  const userInsights = useMemo(() => {
    const deliveredOrders = orderHistory.filter(order => order.status === "Delivered");
    const allItems = deliveredOrders.flatMap(order => order.items);
    
    // Most ordered dish
    const dishCount = {};
    allItems.forEach(item => {
      dishCount[item.name] = (dishCount[item.name] || 0) + item.quantity;
    });
    const mostOrderedDish = Object.keys(dishCount).reduce((a, b) => 
      dishCount[a] > dishCount[b] ? a : b, null);
    
    // Favorite category
    const categoryCount = {};
    allItems.forEach(item => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + item.quantity;
    });
    const favoriteCategory = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b, null);
    
    // Total orders and spending
    const totalOrders = deliveredOrders.length;
    const totalSpent = deliveredOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalSpent / totalOrders;
    
    // Last order date
    const lastOrder = deliveredOrders.sort((a, b) => 
      new Date(b.date) - new Date(a.date))[0];
    
    return {
      mostOrderedDish,
      dishCount: dishCount[mostOrderedDish],
      favoriteCategory,
      categoryCount: categoryCount[favoriteCategory],
      totalOrders,
      totalSpent,
      averageOrderValue,
      lastOrderDate: lastOrder ? lastOrder.date : null
    };
  }, []);

  const filteredOrders = filter === "all" 
    ? orderHistory 
    : orderHistory.filter(order => order.status.toLowerCase() === filter.toLowerCase());

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 DA{i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-500">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your History</h1>
          <p className="text-gray-600">Relive your culinary journey and discover your favorites</p>
        </div>

        {/* Personalized Insights Banner */}
        <div className="bg-gradient-to-r from-[#F67F20] to-[#E55A2B] rounded-2xl p-6 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Your Dining Profile</h2>
              <p className="opacity-90">
                {userInsights.totalOrders} orders • DA{userInsights.totalSpent.toFixed(2)} spent • 
                {userInsights.lastOrderDate ? ` Last order: DA{formatDate(userInsights.lastOrderDate)}` : ''}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                🏆 Loyal Customer
              </div>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Most Ordered Dish */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="rounded-full bg-amber-50 p-3 mr-4">
                <span className="text-2xl">🍔</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Most Ordered Dish</p>
                <p className="text-lg font-bold text-gray-900">{userInsights.mostOrderedDish}</p>
                <p className="text-sm text-gray-500">{userInsights.dishCount} times ordered</p>
              </div>
            </div>
            <button className="text-sm text-[#F67F20] font-medium hover:text-[#E55A2B]">
              Order it again →
            </button>
          </div>

          {/* Favorite Category */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="rounded-full bg-blue-50 p-3 mr-4">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Favorite Category</p>
                <p className="text-lg font-bold text-gray-900">{userInsights.favoriteCategory}</p>
                <p className="text-sm text-gray-500">{userInsights.categoryCount} items ordered</p>
              </div>
            </div>
            <button className="text-sm text-[#F67F20] font-medium hover:text-[#E55A2B]">
              Explore category →
            </button>
          </div>

          {/* Average Order */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="rounded-full bg-green-50 p-3 mr-4">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Order Value</p>
                <p className="text-lg font-bold text-gray-900">DA{userInsights.averageOrderValue.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Per order</p>
              </div>
            </div>
            <button className="text-sm text-[#F67F20] font-medium hover:text-[#E55A2B]">
              See statistics →
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors DA{
                filter === "all" 
                  ? "bg-[#F67F20] text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Orders ({orderHistory.length})
            </button>
            <button
              onClick={() => setFilter("delivered")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors DA{
                filter === "delivered" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Delivered ({orderHistory.filter(o => o.status === "Delivered").length})
            </button>
            <button
              onClick={() => setFilter("cancelled")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors DA{
                filter === "cancelled" 
                  ? "bg-red-100 text-red-800" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancelled ({orderHistory.filter(o => o.status === "Cancelled").length})
            </button>
          </div>
        </div>

        {/* Orders Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 ml-3.5"></div>
          
          <div className="space-y-10 relative">
            {filteredOrders.map((order, index) => (
              <div key={order.id} className="flex gap-6">
                {/* Timeline dot */}
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 DA{
                    order.status === "Delivered" ? "bg-green-100" : 
                    order.status === "Cancelled" ? "bg-red-100" : "bg-blue-100"
                  }`}>
                    <div className={`w-4 h-4 rounded-full DA{
                      order.status === "Delivered" ? "bg-green-500" : 
                      order.status === "Cancelled" ? "bg-red-500" : "bg-blue-500"
                    }`}></div>
                  </div>
                  {index === filteredOrders.length - 1 && (
                    <div className="absolute top-8 bottom-0 w-0.5 bg-white left-1/2 transform -translate-x-1/2"></div>
                  )}
                </div>

                {/* Order Card */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                        <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                        {renderStars(order.rating)}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium DA{getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <span className="text-lg font-bold text-[#F67F20]">DA{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Items Ordered</h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 mr-2">
                                  {item.quantity}x
                                </span>
                                <span className="text-sm text-gray-700">{item.name}</span>
                                <span className="ml-2 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                                  {item.category}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                DA{(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Information */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Order Information</h4>
                        <div className="space-y-4">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs text-blue-600 font-medium">Delivery Address</p>
                            <p className="text-sm text-gray-900">{order.deliveryAddress}</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-xs text-green-600 font-medium">Payment Method</p>
                            <p className="text-sm text-gray-900">{order.paymentMethod}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end space-x-3">
                      <button 
                        onClick={() => navigate("/menu")}
                        className="px-4 py-2 bg-[#F67F20] text-white rounded-lg text-sm font-medium hover:bg-[#E55A2B] transition-colors flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Order Again
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">You don't have any orders matching your current filter.</p>
            <button 
              onClick={() => setFilter("all")}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}