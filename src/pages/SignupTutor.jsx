import React from "react";
import Layout from "../components/home/Layout";
import profileImage from "../assets/img/default-profile.png";
import "../styles/auth.css";
import { Link } from "react-router-dom";

const SignupTutor = () => {
  return (
    <Layout>
      <div className="auth-container">
        <div>
          <h3>Sign up and start teaching</h3>
<br /><input type="text" placeholder="Full name" />
          <input type="email" placeholder="Email" />
          <input type="number" placeholder="Phone Number" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />

          <select name="" id="">
            <option value="">Select Category</option>
            <option value="Website development">Website development</option>
            <option value="Graphics Design">Graphics Design</option>
          </select>

          <select name="" id="">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input type="number" placeholder="Age" />

          <label htmlFor="" style={{textAlign: 'center', display: 'block'}}>Upload Certificate</label><br />
          <input type="file" placeholder="d" />



          <input type="checkbox" style={{ display: 'inline-block', width: 'auto'}} /><span>By signing up, you agree to our <Link to={'/terms-and-policy'}>Terms of Use and Privacy Policy</Link> .</span><br /><br />
          <button className="submit-btn">Sign up</button>

          <hr /><br />
          <p>Already have an account?<Link to={'/tutor-login'} className="link"> Log in</Link></p>
        </div> 
      </div>
    </Layout>
  );
};

export default SignupTutor;
