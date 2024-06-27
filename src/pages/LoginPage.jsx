import React, { useState } from "react";
import Layout from "../components/home/Layout";
import profileImage from "../assets/img/default-profile.png";
import sideImage from "../assets/images/img (6).jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from "react-icons/fa";
import "../styles/auth.css";
import { api_url } from "../config/config";

const LoginPage = () => {
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variable for handling the form submission status
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${api_url}/user/login`, {
        email,
        password,
      });

      toast.success("Login successful! Redirecting...");
      // You can handle further actions like redirecting the user to a different page here
    } catch (error) {
      toast.error("An error occurred. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="div1">
          <img src={sideImage} alt="Side" />
        </div>
        <div className="div2">
          <h3>Log in to your DK Learning account</h3>
          <div className="img">
            <img src={profileImage} alt="Profile" />
          </div>
          <p>Welcome Back</p><br />
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <FaSpinner className="spinner-icon" /> : "Login"}
            </button>
          </form>
          <p>or <Link to={'/forgot-password'} className="link">Forgot Password</Link></p><br />
          <hr /><br />
          <p>Don't have an account?<Link to={'/signup'} className="link"> Sign up</Link></p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
