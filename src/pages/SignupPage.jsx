import React, { useState } from "react";
import Layout from "../components/home/Layout";
import sideImage from "../assets/images/img (6).jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from "react-icons/fa";
import "../styles/auth.css";
import { api_url } from "../config/config";

const SignupPage = () => {
  // State variables for form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // State variable for handling the form submission status
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${api_url}/user/add`, {
        fullName,
        email,
        phoneNumber,
        password,
        confirmPassword
      });

      toast.success("Signup successful! Please check your email to verify your account.");

      setTimeout(()=>{
        window.location.href = "/login"
      }, 2000)

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
          <h3>Sign up and start learning</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div>
              <input
                type="checkbox"
                style={{ display: 'inline-block', width: 'auto' }}
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>By signing up, you agree to our Terms of Use and Privacy Policy.</span>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <FaSpinner className="spinner-icon" /> : "Sign up"}
            </button>
          </form>
          <hr />
          <p>
            Already have an account? <Link to={'/login'} className="link"> Log in</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
