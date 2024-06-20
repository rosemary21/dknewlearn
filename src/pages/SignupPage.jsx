import React from "react";
import Layout from "../components/home/Layout";
import sideImage from "../assets/images/img (6).jpg";

import "../styles/auth.css";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <Layout>
      <div className="auth-container">
      <div className="div1">
          <img src={sideImage} alt="" />
        </div>
        <div className="div2">
          <h3>Sign up and start learning</h3>
<br /><input type="text" placeholder="Full name" />
          <input type="email" placeholder="Email" />
          <input type="number" placeholder="Phone Number" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />

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
