import React, { useEffect, useState } from "react";
import TutorLayout from "../../components/tutor/TutorLayout";
import Courses from "../../components/tutor/Courses";
import profileImg from "../../assets/profile1.png";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAdmin } from "../../services/admin";
import { toast } from "react-toastify";
import { isTokenExpired } from "../../utils/auth";

const AdminDashboard = () => {


  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getAdmin();
        setAdmin(userData);
      } catch (error) {
        console.error('Error fetching admin data:', error);

        toast.error("Admin data not fetched")
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const expired = isTokenExpired();

// Check if token is expired and if the user is not already on the login page
if (expired && window.location.pathname !== "/login") {
  console.log("Token has expired.");
  
  localStorage.clear();
  window.location.href = "/login";
} else {
  console.log("Token is still valid.");
  // Proceed with authenticated actions
}


  return (
    <AdminLayout>
      <div className="tutor-courses">
        <div className="dashboard">
          <div className="top-banner">
            <div className="profile">
              <img
                src={profileImg}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                }}
              />
              <p>Welcome, Admin</p>
            </div>
          </div>
        </div>
        <div className='top-banner panel'>
            <span>Jump Into Course Creation</span>
            <Link to={'/admin/create-courses'}><button className='primary-btn'>Create Your course</button></Link> 
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
