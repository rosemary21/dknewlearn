import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css";
import './App.css'
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import SingleCoursePage from "./pages/SingleCoursePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/User/UserDashboard";
import NotificationsPage from "./pages/User/NotificationsPage.jsx";
import CartPage from "./pages/User/CartPage.jsx";
import WishListPage from "./pages/User/WishListPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Categories from "./pages/Categories.jsx";
import EditProfile from "./pages/User/EditProfile.jsx";
import ChangePassword from "./pages/User/ChangePassword.jsx";
import Subscriptions from "./pages/User/Subscriptions.jsx";

function App() {

  return (   
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/course/:id" element={<SingleCoursePage />} />
          <Route path="/categories" element={<Categories />} />

          {/* auth pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* authenticated user */}
          <Route path="/home/my-courses" element={<UserDashboard />} />
          <Route path="/home/cart" element={<CartPage />} />
          <Route path="/home/notifications" element={<NotificationsPage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/subscriptions" element={<Subscriptions />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
