import React, { useState } from "react";
import Layout from "../components/home/Layout";
import profileImage from "../assets/img/default-profile.png";
import sideImage from "../assets/images/img (6).jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import "../styles/auth.css";
import { api_url } from "../config/config";

const LoginTutor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${api_url}/login/staff`, {
        userName: email,
        password,
      });

      toast.success("Login successful!");

      console.log(response.data)

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.emailAddress);
      localStorage.setItem("user", response.data?.userName);
      localStorage.setItem("role", "tutor");

      const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
      localStorage.setItem("tokenExpiration", expirationTime);

      setTimeout(() => {
        window.location.href = "/tutor"
      }, 1000);

    } catch (error) {


      console.log(error)

      if(error.response.status == 400){
        toast.error(error.response.data.responseDto.message)
      } else{
        toast.error("An error occurred. Please check your credentials and try again.");
      }
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
          <h3>Log in as a DK Learning Tutor</h3>
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
          <div className="password-input-container">
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <FaSpinner className="spinner-icon" /> : "Login"}
            </button>
          </form>
          <p>or <Link to={'/tutor/forgot-password'} className="link">Forgot Password</Link></p><br />
          <hr /><br />
          <p>Don't have an account?<Link to={'/tutor-signup'} className="link"> Sign up</Link></p>
        </div>
      </div> 
    </Layout>
  );
};

export default LoginTutor;
