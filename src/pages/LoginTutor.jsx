import React from "react";
import Layout from "../components/home/Layout";
import profileImage from "../assets/img/default-profile.png";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";

const LoginTutor = () => {

  const navigate = useNavigate()

  const handleSubmit = () => {
    alert('Login successful')
    navigate('/tutor')
  }
  return (
    <Layout>
      <div className="auth-container">
        <div>
          <h3>Log as a DK Learning Tutor</h3>
          <div className="img">
            {" "}
            <img src={profileImage} alt="" />
          </div>
          <p>Welcome Back</p><br />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="submit-btn" onClick={handleSubmit}>Login</button>

          <p>or <Link to={'/forgot-password'} className="link">Forgot Password</Link></p><br />
          <hr /><br />
          <p>Don't have an account?<Link to={'/tutor-signup'} className="link"> Sign up</Link></p>
        </div> 
      </div>
    </Layout>
  );
};

export default LoginTutor;
