import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css";
import './App.css'
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import SingleCoursePage from "./pages/SingleCoursePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/User/UserDashboard";




function App() {

  return (   
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/course" element={<SingleCoursePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home/my-courses" element={<UserDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
