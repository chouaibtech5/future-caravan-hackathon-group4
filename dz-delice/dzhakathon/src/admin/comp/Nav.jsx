import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoDzDelice from '../../icons/LogoDzDelice';
import LogoutModal from './LogoutModal';

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // Navigation items
  const navItems = [
    { title: 'Dashboard', path: '/admin/dashboard', icon: 'grid_view' },
    { title: 'Orders', path: '/admin/orders', icon: 'receipt_long' },
    { title: 'Menu Management', path: '/admin/menu', icon: 'restaurant_menu' },
    { title: 'Statistic & AI', path: '/admin/statistics', icon: 'analytics' },
    { title: 'Employees', path: '/admin/employees', icon: 'people' },
    { title: 'Clients', path: '/admin/clients', icon: 'person' },
    { title: 'Reviews', path: '/admin/reviews', icon: 'star_rate' },
    { title: 'Notifications', path: '/admin/notifications', icon: 'notifications' },
    { title: 'Settings', path: '/admin/settings', icon: 'settings' },
  ];
  
  // Check if the current path matches the nav item path
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle logout
  const handleLogout = () => {
    setShowLogoutModal(false);
    // Add any logout logic here (clear tokens, etc.)
    navigate('/');
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  return (
    <div className="h-auto max-h-[80vh] w-64 bg-white border shadow-lg flex flex-col ">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <LogoDzDelice className="h-8 w-8" />
          <span className="ml-2 text-xl font-bold text-[#F26522]">DzDélice</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                isActive(item.path)
                  ? 'bg-orange-50 text-[#F26522]'
                  : 'text-gray-600 hover:bg-orange-50 hover:text-[#F26522]'
              }`}
            >
              <span className="material-symbols-outlined mr-3">{item.icon}</span>
              <span>{item.title}</span>
              {item.title === 'Dashboard' && isActive(item.path) && (
                <div className="ml-auto h-2 w-2 rounded-full bg-[#F26522]"></div>
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogoutClick}
          className="flex items-center px-4 py-3 text-sm text-gray-600 rounded-lg hover:bg-gray-100 w-full text-left"
        >
          <span className="material-symbols-outlined mr-3">logout</span>
          <span>Log out</span>
        </button>
      </div>
      
      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Nav;
