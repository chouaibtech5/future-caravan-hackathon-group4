import React from 'react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 border-2 border-blue-400 shadow-xl">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Are you sure you want to log out ?
          </h2>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-8 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;