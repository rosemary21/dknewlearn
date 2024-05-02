import React from "react";
import Layout from "../../components/home/Layout";
import profileImage from "../../assets/img/default-profile.png";
import "../../styles/auth.css";
import { Link } from "react-router-dom";

const TutorChangePassword = () => {
  return (
    <Layout>
      <div className="auth-container">
        <div>
          <h3>Change Password</h3><br />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button className="submit-btn">Change Password</button>

          <hr /><br />
          <p><Link to={'/tutor/settings'} className="link"> Go back to profile</Link></p>
        </div> 
      </div>
    </Layout>
  );
};

export default TutorChangePassword;
