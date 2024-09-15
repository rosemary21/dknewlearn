import React, { useEffect, useState } from "react";
import Header from "../home/Header";
import Footer from "../home/Footer";
import "../home/layout.css";
import "../../styles/tutor.css";
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaMoneyBill, FaSignOutAlt } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TutorLayout = ({ children }) => {
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate("/")
}



  return (
    <div className="tutor">
      <Header onToggleAside={toggleAside} />

      {isAsideVisible && (
        <div className="mobile-nav">
          <div className="sub-mobile-nav">
          <Link to={"/tutor"}>
            <p className="nav-link"><MdDashboard/> Dashboard</p>
            </Link>
            <Link to={"/tutor/courses"}>
            <p className="nav-link"><BiBook /> Courses</p>
            </Link>

            <Link to={"/tutor/courses-review"}>
            <p className="nav-link"><BiBook /> Courses Review</p>
            </Link>

            <Link to={"/tutor/settings"}>
            <p className="nav-link"><FaCog/> Settings</p>
            </Link>

            <Link to={"/tutor/earnings"}>
            <p className="nav-link"><FaMoneyBill/> Earnings</p>
            </Link>

            <p className="nav-link" onClick={logout}>
                <FaSignOutAlt /> Logout
            </p>
          </div>
        </div>
      )}


       

      <main>
        <div className="main">
        <div className="nav">
            <Link to={"/tutor"}>
            <p className="nav-link"><MdDashboard/> Dashboard</p>
            </Link>
            <Link to={"/tutor/courses"}>
            <p className="nav-link"><BiBook /> Courses</p>
            </Link>

            <Link to={"/tutor/courses-review"}>
            <p className="nav-link"><BiBook /> Courses Review</p>
            </Link>

            <Link to={"/tutor/settings"}>
            <p className="nav-link"><FaCog/> Settings</p>
            </Link>

            <Link to={"/tutor/earnings"}>
            <p className="nav-link"><FaMoneyBill/> Earnings</p>
            </Link>

            <p className="nav-link" onClick={logout}>
                <FaSignOutAlt /> Logout
            </p>
          </div>

          <div>
        {children}
        </div>
        </div>

        <Footer />
        <ToastContainer />
      </main>
          </div>

  );
};

export default TutorLayout;
