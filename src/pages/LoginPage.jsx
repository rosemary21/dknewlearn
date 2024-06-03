import React from "react";
import Layout from "../components/home/Layout";
import profileImage from "../assets/img/default-profile.png";
import "../styles/auth.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Layout>
      <div className="auth-container">
        <div>
          <h3>Log in to your DK Learning account</h3>
          <div className="img">
            {" "}
            <img src={profileImage} alt="" />
          </div>
          <p>Welcome Back</p><br />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Link to={'/home/my-courses'}><button className="submit-btn">Login</button></Link>

          <p>or <Link to={'/forgot-password'} className="link">Forgot Password</Link></p><br />
          <hr /><br />
          <p>Don't have an account?<Link to={'/signup'} className="link"> Sign up</Link></p>
        </div> 
      </div>
    </Layout>
  );
};

export default LoginPage;
