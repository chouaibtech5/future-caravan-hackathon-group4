import { useState } from "react";
import Categories from "../components/Categories.jsx";
import Trending from "../components/Trending.jsx";
import Promotions from "../components/Promotions.jsx";
import MyOrder from "./MyOrder.jsx";
import Historic from "./Historic.jsx";
import Profile from "./Profile.jsx";
import ProfileClient from "./ProfileClient.jsx";
import NotificationsClient from "./NotificationsClient.jsx";
import DashboardMenu from "../components/DashboardMenu.jsx";
import ProductDetailView from "../components/ProductDetailView.jsx";
import DzDeliceBot from "./DzDeliceBot.jsx";
import SearchIcon from "../icons/SearchIcon.jsx";
import GlobeIcon from "../icons/GlobeIcon.jsx";
import ShoppingBagIcon from "../icons/ShoppingBagIcon.jsx";
import LogoDzDelice from "../icons/LogoDzDelice.jsx";
import HomeIcon from "../icons/HomeIcon.jsx";
import MenuManagementIcon from "../icons/MenuManagementIcon.jsx";
import MyOrderIcon from "../icons/MyOrderIcon.jsx";
import HistoricIcon from "../icons/HistoricIcon.jsx";
import NotificationIcon from "../icons/NotificationIcon.jsx";
import ProfileIcon from "../icons/ProfileIcon.jsx";
import AiIcon from "../icons/AiIcon.jsx";

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("home");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Add logout logic here (clear tokens, localStorage, etc.)
    console.log("Logging out...");
    
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.clear();
    
    // Close the modal
    setShowLogoutModal(false);
    
    // Redirect to home page
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <Promotions />
            <Categories />
            <Trending />
          </>
        );
      case "menu-management":
        return <DashboardMenu onNavigateToProduct={() => setActiveTab("product-detail")} />;
      case "product-detail":
        return <ProductDetailView onNavigateToMenu={() => setActiveTab("menu-management")} />;
      case "my-order":
        return <MyOrder />;
      case "historic":
        return <Historic />;
      case "notifications":
        return <NotificationsClient />;
      case "profile":
        return <ProfileClient />;
      case "ai-bot":
        return <DzDeliceBot />;
      default:
        return (
          <>
            <Categories />
            <Trending />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <div className="container mx-auto grid grid-cols-12 gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white rounded-2xl shadow-sm p-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 mb-8">
            <LogoDzDelice />
            <span className="text-[24px] font-extrabold leading-none">
              <span className="text-black">Dz</span>
              <span className="text-[#F67F20]">Délice</span>
            </span>
          </div>

          <nav className="space-y-3">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left ${
                activeTab === "home"
                  ? "bg-[#FFF1E6] text-[#F67F20]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <HomeIcon
                size={18}
                fill={activeTab === "home" ? "#F67F20" : "#BBBBBB"}
              />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "130%",
                  letterSpacing: "2%",
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
              >
                Home
              </span>
            </button>
            <button
              onClick={() => setActiveTab("menu-management")}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left ${
                activeTab === "menu-management"
                  ? "bg-[#FFF1E6] text-[#F67F20]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <MenuManagementIcon
                size={19}
                fill={activeTab === "menu-management" ? "#F67F20" : "#BBBBBB"}
              />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "130%",
                  letterSpacing: "2%",
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
              >
                Menu
              </span>
            </button>
            <button
              onClick={() => setActiveTab("my-order")}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left ${
                activeTab === "my-order"
                  ? "bg-[#FFF1E6] text-[#F67F20]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <MyOrderIcon
                size={16}
                fill={activeTab === "my-order" ? "#F67F20" : "#BBBBBB"}
              />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "130%",
                  letterSpacing: "2%",
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
              >
                My Order
              </span>
            </button>
            <button
              onClick={() => setActiveTab("historic")}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left ${
                activeTab === "historic"
                  ? "bg-[#FFF1E6] text-[#F67F20]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <HistoricIcon
                size={18}
                fill={activeTab === "historic" ? "#F67F20" : "#BBBBBB"}
              />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "130%",
                  letterSpacing: "2%",
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
              >
                Historic
              </span>
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left ${
                activeTab === "notifications"
                  ? "bg-[#FFF1E6] text-[#F67F20]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <NotificationIcon
                size={18}
                fill={activeTab === "notifications" ? "#F67F20" : "#BBBBBB"}
              />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "130%",
                  letterSpacing: "2%",
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
              >
                Notifications
              </span>
            </button>
            <button
              onClick={() => setActiveTab("ai-bot")}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left ${
                activeTab === "ai-bot"
                  ? "bg-[#FFF1E6] text-[#F67F20]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <AiIcon
                size={18}
                fill={activeTab === "ai-bot" ? "#F67F20" : "#BBBBBB"}
              />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "130%",
                  letterSpacing: "2%",
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
              >
                DzDéliceBot
              </span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left ${
                activeTab === "profile"
                  ? "bg-[#FFF1E6] text-[#F67F20]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <ProfileIcon
                size={18}
                fill={activeTab === "profile" ? "#F67F20" : "#BBBBBB"}
              />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "130%",
                  letterSpacing: "2%",
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
              >
                Profile
              </span>
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 w-full text-left"
            >
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "130%",
                  letterSpacing: "2%",
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                  color: "#BBBBBB",
                }}
              >
                Log out
              </span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10 space-y-8">
          {/* Search + Title bar */}
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm p-4">
            <h1
              className="text-black"
              style={{
                fontFamily: "Poppins",
                fontWeight: 800,
                fontSize: "16px",
                lineHeight: "20px",
                letterSpacing: "0%",
              }}
            >
              {activeTab === "home" && "Home"}
              {activeTab === "menu-management" && "Menu"}
              {activeTab === "product-detail" && "Menu"}
              {activeTab === "my-order" && "My Orders"}
              {activeTab === "historic" && "Order History"}
              {activeTab === "notifications" && "Notifications"}
              {activeTab === "profile" && "Profile"}
              {activeTab === "ai-bot" && "DzDéliceBot"}
            </h1>

            {/* Center Search Bar */}
            <div className="flex-1 flex justify-center">
              <div
                className="flex w-[400px] items-center gap-3 rounded-[8px] bg-[#FAFAFA] px-4 py-2"
                style={{
                  height: "36px",
                  paddingTop: "8px",
                  paddingRight: "16px",
                  paddingBottom: "8px",
                  paddingLeft: "16px",
                  gap: "12px",
                }}
              >
                <SearchIcon size={17} />
                <input
                  className="w-full bg-transparent outline-none"
                  placeholder="Search"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0%",
                  }}
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-4">
              {/* Globe icon */}
              <div className="w-8 h-8 flex items-center justify-center bg-[#FAFAFA] rounded-lg">
                <GlobeIcon size={21} />
              </div>

              {/* Shopping bag icon */}
              <div className="w-8 h-8 flex items-center justify-center bg-[#FAFAFA] rounded-lg">
                <ShoppingBagIcon size={20} />
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          <section>{renderContent()}</section>
        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Background Overlay */}
          <div 
            className="absolute inset-0 backdrop-blur-md"
            onClick={() => setShowLogoutModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 transform transition-all">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Confirm Logout
              </h3>
              
              {/* Message */}
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out? You'll need to sign in again to access your account.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
