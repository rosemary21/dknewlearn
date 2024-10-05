import React, { useState } from "react";
import Layout from "../components/home/Layout";
import profileImage from "../assets/img/default-profile.png";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api_url } from "../config/config";
import axios from "axios";

const TutorForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please fill in your email.");
      return;
    }

    setLoading(true);

    const formData =
    {
      "otpId": email,
      "otpType": "R",
      "notificationType": "M",
      "sendSource": email
    }

    try {
      const response = await axios.post(`${api_url}/otp/request`, formData);


      if(response.data.status == "SUCCESS"){
        console.log("success")

        localStorage.setItem("resetEmail", email)

        toast.success("Reset password successful, please check your email");

        setTimeout(()=>{
          window.location.href = "/reset-password"
        }, 2000)


      } else {
        toast.error("Password reset not successful")
      }

  


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
        <div className="single-div">
          <br /><br />
          <h3>Forgot Password</h3>
          <br />
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Type in your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br />


            <button className="submit-btn" type="submit">Reset Password</button>
          </form>

          <hr /><br />
          <p>Or<Link to={'/login'} className="link"> Login</Link></p><br /><br />
        </div>
      </div>
    </Layout>
  );
};

export default TutorForgotPassword;
