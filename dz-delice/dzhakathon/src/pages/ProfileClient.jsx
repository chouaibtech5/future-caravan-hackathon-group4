import { useState } from "react";

export default function ProfileClient() {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    dateOfBirth: "",
    notes: "",
    phone: "+23 555 76 54 32",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", userInfo);
    // Add save logic here
  };

  const handleChangePhone = () => {
    console.log("Changing phone number");
    // Add phone change logic here
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src="/api/placeholder/64/64" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Bouhalis Rim</h2>
            <p className="text-gray-600">bouhalisrim@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors">
            My favorites
          </button>
          <button 
            onClick={handleSaveProfile}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={userInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of birth
          </label>
          <div className="relative">
            <input
              type="date"
              value={userInfo.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              placeholder="Your Date of birth"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
          <span className="text-gray-400 text-xs ml-2">0/200</span>
        </label>
        <textarea
          value={userInfo.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          placeholder="Add some notes"
          rows={4}
          maxLength={200}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
        />
      </div>

      {/* Phone Number Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My phone number</h3>
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">{userInfo.phone}</p>
              <p className="text-sm text-gray-500">1 month ago</p>
            </div>
          </div>
          <button 
            onClick={handleChangePhone}
            className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors"
          >
            Change phone number
          </button>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change your password</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Old password
            </label>
            <div className="relative">
              <input
                type="password"
                value={userInfo.oldPassword}
                onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                placeholder="••••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none pr-12"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New password
            </label>
            <div className="relative">
              <input
                type="password"
                value={userInfo.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                placeholder="••••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none pr-12"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type="password"
                value={userInfo.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="••••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none pr-12"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Earning Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Earning</h3>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            The more points you earn, the <span className="text-orange-600 font-semibold">bigger the discount</span> on your favorite meal!
          </p>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">Your points: <span className="font-semibold text-gray-900">51</span></p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">
              Discounts <span className="text-orange-500">VS</span> points:
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">200 point :</span>
                <span className="text-gray-600">-5%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">400 point :</span>
                <span className="text-gray-600">-12%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">800 point :</span>
                <span className="text-gray-600">-25%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">1500 point :</span>
                <span className="text-gray-600">-40%</span>
              </div>
            </div>
          </div>

          <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
            Order now to get more points !
          </button>
        </div>
      </div>
    </div>
  );
}