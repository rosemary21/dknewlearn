import React, { useState } from "react";
import Layout from "../components/home/Layout";
import profileImage from "../assets/img/default-profile.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from "react-icons/fa";
import "../styles/auth.css";
import { api_url } from "../config/config";

const SignupTutor = () => {
  // State variables for form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [certificate, setCertificate] = useState("");
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
      const response = await axios.post(`${api_url}/staff/add`, {
        fullName,
        email,
        phoneNumber,
        password,
        confirmPassword,
        category,
        gender,
        age,
        certificateUrl: certificate,
      });

      toast.success("Signup successful! Please check your email to verify your account.");
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
        {/* <div className="div1">
          <img src={profileImage} alt="Profile" />
        </div> */}
        <div className="div2">
          <h2>Sign up and start teaching</h2><br />
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
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Website development">Website development</option>
              <option value="Graphics Design">Graphics Design</option>
            </select>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <label htmlFor="certificate" style={{ textAlign: 'center', display: 'block' }}>
              Certificate (URL)
            </label>
            <input
              type="text"
              id="certificate"
              placeholder="Certificate URL"
              value={certificate}
              onChange={(e) => setCertificate(e.target.value)}
              required
            />
            <div>
              <input
                type="checkbox"
                style={{ display: 'inline-block', width: 'auto' }}
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>By signing up, you agree to our <Link to={'/terms-and-policy'}>Terms of Use and Privacy Policy</Link>.</span>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <FaSpinner className="spinner-icon" /> : "Sign up"}
            </button>
          </form>
          <hr /><br />
          <p>
            Already have an account? <Link to={'/tutor-login'} className="link">Log in</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignupTutor;
