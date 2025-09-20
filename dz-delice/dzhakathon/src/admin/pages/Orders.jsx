import React, { useState } from 'react';
import Nav from '../comp/Nav';

const Orders = () => {
  // Sample orders data matching the design
  const [ordersData] = useState([
    {
      orderId: '#8606',
      customer: 'Chouaib BoL',
      date: '09/19/2025',
      items: [
        {
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage de...',
          status: 'Preparing',
          quantity: 2,
          subtotal: '1000 DA',
          image: '/burger-image.jpg'
        },
        {
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage de...',
          status: 'Delivered',
          quantity: 1,
          subtotal: '1250 DA',
          image: '/burger-image.jpg'
        },
        {
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage de...',
          status: 'Cancelled',
          quantity: 1,
          subtotal: '750 DA',
          image: '/burger-image.jpg'
        }
      ],
      delivery: '200 DA',
      total: '2000 DA'
    },
    {
      orderId: '#8605',
      customer: 'Chouaib BoL',
      date: '09/19/2025',
      items: [
        {
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage de...',
          status: 'Preparing',
          quantity: 2,
          subtotal: '1000 DA',
          image: '/burger-image.jpg'
        },
        {
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage de...',
          status: 'Delivered',
          quantity: 1,
          subtotal: '1250 DA',
          image: '/burger-image.jpg'
        },
        {
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage de...',
          status: 'Cancelled',
          quantity: 1,
          subtotal: '750 DA',
          image: '/burger-image.jpg'
        }
      ],
      delivery: '200 DA',
      total: '4400 DA'
    },
    {
      orderId: '#8604',
      customer: 'Chouaib BoL',
      date: '09/19/2025',
      items: [
        {
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage de...',
          status: 'Preparing',
          quantity: 2,
          subtotal: '1000 DA',
          image: '/burger-image.jpg'
        },
        {
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage de...',
          status: 'Delivered',
          quantity: 1,
          subtotal: '1250 DA',
          image: '/burger-image.jpg'
        },
        {
          name: 'Burger Classique',
          description: 'Pain moelleux, steak haché 100g, fromage de...',
          status: 'Cancelled',
          quantity: 1,
          subtotal: '750 DA',
          image: '/burger-image.jpg'
        }
      ],
      delivery: '200 DA',
      total: '6400 DA'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter orders based on search
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex h-screen bg-[#FFFBF8] ">
      {/* Sidebar */}
      <Nav />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
              
              {/* Search in Header */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F26522] focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                <span className="material-symbols-outlined">language</span>
              </button>
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                <span className="material-symbols-outlined">notifications</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Orders Table - Same style as Dashboard */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Orders</h3>
              <div className="flex items-center space-x-1">
                <button className="px-3 py-1 text-sm font-medium text-[#F26522] border-[#F26522]">day</button>
                <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-[#F26522]">week</button>
                <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-[#F26522]">month</button>
                <button className="p-2 ml-2 text-gray-400 hover:bg-gray-100 rounded-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-semibold text-gray-800 border-b border-gray-200">
                    <th className="pb-3 font-semibold">Food</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Quantity</th>
                    <th className="pb-3 font-semibold">Subtotal</th>
                    <th className="pb-3 font-semibold">Delivery</th>
                    <th className="pb-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order, orderIndex) => (
                    <React.Fragment key={order.orderId}>
                      {/* Order Header */}
                      <tr className="text-sm text-gray-700">
                        <td colSpan={6} className="py-4">
                          <p className="font-semibold text-gray-900">Order {order.orderId}</p>
                          <p className="text-sm text-gray-600 font-normal">Customer: {order.customer} on {order.date}</p>
                        </td>
                      </tr>
                      
                      {/* Order Items */}
                      {order.items.map((item, itemIndex) => (
                        <tr key={`${orderIndex}-${itemIndex}`} className="text-sm border-b border-gray-50">
                          <td className="py-4 flex items-center">
                            <div className="h-12 w-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mr-4 flex-shrink-0 flex items-center justify-center overflow-hidden">
                              <img 
                                src="/burger-exploded.svg" 
                                alt={item.name}
                                className="w-8 h-8 object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <svg 
                                className="w-6 h-6 text-[#F26522] hidden" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zM12 19c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500 font-normal">{item.description}</p>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                              item.status === 'Preparing' ? 'bg-orange-100 text-orange-600' :
                              item.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 text-gray-900 font-medium">{item.quantity}</td>
                          <td className="py-4 text-gray-900 font-medium">{item.subtotal}</td>
                          <td className="py-4 text-gray-500 font-normal">
                            {itemIndex === 0 ? '-' : ''}
                          </td>
                          <td className="py-4 text-gray-900 font-semibold">
                            {itemIndex === 0 ? order.total : ''}
                          </td>
                        </tr>
                      ))}
                      
                      {/* Order Total Row */}
                      <tr className="border-b border-gray-100">
                        <td colSpan={4} className="py-2"></td>
                        <td className="py-2 text-gray-700 font-semibold">{order.delivery}</td>
                        <td className="py-2 text-gray-900 font-bold">{order.total}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-gray-400 text-4xl mb-2">receipt_long</span>
                <p className="text-gray-500">No orders found matching your criteria.</p>
              </div>
            )}
            
            {/* Pagination */}
            {filteredOrders.length > 0 && (
              <div className="flex justify-between items-center mt-6">
                <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Previous
                </button>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button 
                      key={page}
                      className={`w-8 h-8 flex items-center justify-center text-sm rounded-md ${
                        page === 1 ? 'bg-[#F26522] text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                  Next
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;