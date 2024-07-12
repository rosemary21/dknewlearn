import React, { useState } from "react";
import Layout from "../components/home/Layout";
import profileImage from "../assets/img/default-profile.png";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { api_url } from "../config/config";

const ResetPassword = () => {

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const email = localStorage.getItem("resetEmail")

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please fill in your otp.");
      return;
    }

    if (!password) {
      toast.error("Please fill in your new password.");
      return;
    }

    setLoading(true);

    const formData =
    {
      "emailAddress": email,
      "newPassword": password,
      "otp": otp,
    }

    try {
      const response = await axios.post(`${api_url}/user/resetpassword`, formData);

      toast.success("Reset password successful");


    } catch (error) {
      toast.error("An error occurred. Please check your credentials and try again.");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout>
      <div className="auth-container">
        <div>
          <h3>Reset Password</h3>
          <br />
         

          <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled
          />

<input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />


          <button className="submit-btn">Reset Password</button>
          </form>




          <hr /><br />
          <p>Or<Link to={'/login'} className="link"> Login</Link></p>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
