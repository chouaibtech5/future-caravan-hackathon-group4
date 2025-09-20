import { useCart } from "../context/CartContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyOrder() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState("current"); // "current" or "history"

  // Static orders data
  const staticOrders = [
    {
      id: 1001,
      name: "Chicken Burger Meal",
      price: 12.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      date: "2023-10-15",
      status: "Delivered",
      items: [
        { name: "Chicken Burger", price: 8.99 },
        { name: "French Fries", price: 3.00 },
        { name: "Soda", price: 1.00 }
      ]
    },
    {
      id: 1002,
      name: "Vegetable Pizza",
      price: 15.50,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      date: "2023-10-14",
      status: "Delivered",
      items: [
        { name: "Large Veggie Pizza", price: 15.50 }
      ]
    },
    {
      id: 1003,
      name: "Fresh Salad Bowl",
      price: 8.75,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      date: "2023-10-13",
      status: "Delivered",
      items: [
        { name: "Garden Salad", price: 7.25 },
        { name: "Grilled Chicken", price: 1.50 }
      ]
    }
  ];

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getStaticTotalPrice = () => {
    return staticOrders.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
      <p className="text-gray-600 mb-6">Manage your current order and view past orders</p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-4 py-2 font-medium text-sm ${activeTab === "current" ? "border-b-2 border-[#F67F20] text-[#F67F20]" : "text-gray-500 hover:text-gray-700"}`}
        >
          Current Order
          {cart.length > 0 && (
            <span className="ml-2 bg-[#F67F20] text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 font-medium text-sm ${activeTab === "history" ? "border-b-2 border-[#F67F20] text-[#F67F20]" : "text-gray-500 hover:text-gray-700"}`}
        >
          Order History
          <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {staticOrders.length}
          </span>
        </button>
      </div>

      {activeTab === "current" ? (
        // Current cart view
        cart.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your have No Order for Today 
            </h3>
            <p className="text-gray-500 mb-4">
              Add some delicious items to get started!
            </p>
            <button 
            onClick={() => setActiveTab("product-detail")}
             className="px-4 py-2 bg-[#F67F20] text-white rounded-lg hover:bg-[#E55A2B] transition-colors">
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 shadow-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 shadow-sm"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">Subtotal:</span>
                <span className="text-lg font-medium text-gray-900">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">Tax (10%):</span>
                <span className="text-lg font-medium text-gray-900">
                  ${(getTotalPrice() * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-[#F67F20]">
                  ${(getTotalPrice() * 1.1).toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-[#F67F20] text-white py-3 rounded-lg hover:bg-[#E55A2B] transition-colors font-medium text-lg shadow-md hover:shadow-lg">
                Place Order
              </button>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full mt-3 text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>
        )
      ) : (
        // Order History view
        <div className="space-y-6">
          {staticOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Order # {order.id}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === "Delivered" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {order.status}
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-shrink-0">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{order.name}</h3>
                  
                  <div className="mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm text-gray-600">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Quantity: {order.quantity}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="font-bold text-lg text-[#F67F20]">
                        ${(order.price * order.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button className="text-sm text-[#F67F20] hover:text-[#E55A2B] font-medium mr-4">
                  Reorder
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">Total Orders</div>
                <div className="text-2xl font-bold text-gray-900">{staticOrders.length}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Spent</div>
                <div className="text-2xl font-bold text-[#F67F20]">
                  ${getStaticTotalPrice().toFixed(2)}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}