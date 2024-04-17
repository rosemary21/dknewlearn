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


function App() {

  return (   
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/course" element={<SingleCoursePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home/my-courses" element={<UserDashboard />} />
          <Route path="/home/cart" element={<CartPage />} />
          <Route path="/home/notifications" element={<NotificationsPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
