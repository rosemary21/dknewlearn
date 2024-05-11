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
import TutorDashboard from "./pages/Tutor/TutorDashboard.jsx";
import TutorSettings from "./pages/Tutor/TutorSettings.jsx";
import TutorCourses from "./pages/Tutor/TutorCourses.jsx";
import SignupTutor from "./pages/SignupTutor.jsx";
import LoginTutor from "./pages/LoginTutor.jsx";
import TutorChangePassword from "./pages/Tutor/TutorChangePassword.jsx";
import Teaching from "./pages/Teaching.jsx";
import TermsAndPolicy from "./pages/TermsAndPolicy.jsx";
import TutorCreateCourses from "./pages/Tutor/TutorCreateCourse.jsx";
import CourseContent from "./pages/CourseDetail.jsx";
import EditCourse from "./components/tutor/EditCourse.jsx";
import TutorEditCourse from "./pages/Tutor/TutorEditCourse.jsx";
import TutorCourseReview from "./pages/Tutor/TutorCourseReview.jsx";
import TutorEarnings from "./pages/Tutor/TutorEarnings.jsx";

function App() {

  return (   
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/course/:id" element={<SingleCoursePage />} />
          <Route path="/view-course/:id" element={<CourseContent />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/terms-and-policy" element={<TermsAndPolicy />} />

          {/* auth pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route path="/tutor-login" element={<LoginTutor />} />
          <Route path="/tutor-signup" element={<SignupTutor />} />

          {/* authenticated user */}
          <Route path="/home/my-courses" element={<UserDashboard />} />
          <Route path="/home/cart" element={<CartPage />} />
          <Route path="/home/notifications" element={<NotificationsPage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/subscriptions" element={<Subscriptions />} />

           {/* tutor  */}
           <Route path="/tutor" element={<TutorDashboard />} />
           <Route path="/tutor/courses" element={<TutorCourses />} />
           <Route path="/tutor/create-courses" element={<TutorCreateCourses />} />
           <Route path="/tutor/edit-course" element={<TutorEditCourse />} />
           <Route path="/tutor/courses-review" element={<TutorCourseReview />} />
           <Route path="/tutor/earnings" element={<TutorEarnings />} />
           <Route path="/tutor/settings" element={<TutorSettings />} />
           <Route path="/tutor/change-password" element={<TutorChangePassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
