import React from "react";
import Layout from "../components/home/Layout";
import profileImage from "../assets/img/default-profile.png";
import "../styles/auth.css";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <Layout>
      <div className="auth-container">
        <div>
          <h3>Sign up and start learning</h3>
<br /><input type="text" placeholder="Full name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <input type="checkbox" style={{ display: 'inline-block', width: 'auto'}} /><span>By signing up, you agree to our Terms of Use and Privacy Policy.</span><br /><br />
          <button className="submit-btn">Sign up</button>

          <hr /><br />
          <p>Already have an account?<Link to={'/login'} className="link"> Log in</Link></p>
        </div> 
      </div>
    </Layout>
  );
};

export default SignupPage;
