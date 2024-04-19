import React from "react";
import Layout from "../components/home/Layout";
import profileImage from "../assets/img/default-profile.png";
import "../styles/auth.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <Layout>
      <div className="auth-container">
        <div>
          <h3>Forgot Password</h3>
    <br />
          <input type="email" placeholder="Email" /><br />
          <button className="submit-btn">Reset Password</button>

          <hr /><br />
          <p>Or<Link to={'/login'} className="link"> Login</Link></p>
        </div> 
      </div>
    </Layout>
  );
};

export default ForgotPassword;
