import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Home from "./pages/home.jsx";
import SMSVerification from "./pages/sms.jsx";
import ResetPassword from "./pages/resetPassword.jsx";
import SuccessConfirm from "./pages/sucessconfirm.jsx";
import ResetPasswordConfirm from "./pages/resetPasswordConfirm.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";
import Orders from "./admin/pages/Orders.jsx";
import MenuManagement from "./admin/pages/MenuManagement.jsx";
import AddMeal from "./admin/pages/AddMeal.jsx";
import Employees from "./admin/pages/Employees.jsx";
import Clients from "./admin/pages/Clients.jsx";
import Reviews from "./admin/pages/Reviews.jsx";
import Settings from "./admin/pages/Settings.jsx";
import StatisticAI from "./admin/pages/StatisticAI.jsx";
import AddStatisticForMeal from "./admin/pages/AddStatisticForMeal.jsx";
import MealStatisticDetails from "./admin/pages/MealStatisticDetails.jsx";
import Notifications from "./admin/pages/Notifications.jsx";
import Dishes from "./pages/dishes.jsx";
import About from "./pages/about.jsx";  
import Login from "./pages/login.jsx";
import Cart from "./pages/Cart.jsx";
// import DashboardClient from "./pages/dashboardClient.jsx";
import DishDetails from "./pages/DishDetails.jsx";
import DashboardClient from "./pages/dashboardClient.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import PaymentDetails from "./pages/PaymentDetails.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailure from "./pages/PaymentFailure.jsx";
// import DishDetails from "./pages/DishDetails.jsx";
// chart.jschart.js


export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-dvh text-gray-900">
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailure />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/payment-details/:orderNumber" element={<PaymentDetails />} />
            <Route path="/dish/:id" element={<DishDetails />} />
            <Route path="/sms-verification" element={<SMSVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password-confirm" element={<ResetPasswordConfirm />} />
            <Route path="/success-confirm" element={<SuccessConfirm />} />
             <Route path="/dishes" element={<Dishes />} />
            {/* <Route path="/dish/:id" element={<DishDetails />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardClient />} />
            <Route path="/product-detail" element={<ProductDetail />} />

            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/menu" element={<MenuManagement />} />
            <Route path="/admin/add-meal" element={<AddMeal />} />
            <Route path="/admin/employees" element={<Employees />} />
            <Route path="/admin/clients" element={<Clients />} />
            <Route path="/admin/reviews" element={<Reviews />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/statistics" element={<StatisticAI />} />
            <Route path="/admin/add-statistic" element={<AddStatisticForMeal />} />
            <Route path="/admin/meal-statistic/:id" element={<MealStatisticDetails />} />
            <Route path="/admin/notifications" element={<Notifications />} />
            
            {/* Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
