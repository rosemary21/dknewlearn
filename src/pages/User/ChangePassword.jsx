import React, { useState } from "react";
import axios from 'axios';
import Layout from "../../components/home/Layout";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_url, token } from "../../config/config";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${api_url}/user/changepassword`, {
        oldPassword,
        newPassword,
        confirmPassword: confirmNewPassword
      }, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success("Password changed successfully");
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div><br /><br />
          <h2>Change Password</h2><br /><br />
          <div className="password-input-container">
            <input 
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password" 
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="password-input-container">
            <input 
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="password-input-container">
            <input 
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Confirm New Password" 
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            >
              {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button 
            className="submit-btn" 
            onClick={handlePasswordChange}
            disabled={loading}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>

          <hr /><br />
          <p><Link to={'/edit-profile'} className="link">Go back to profile</Link></p>
          <br /><br /><br /> 
        </div> 
    
      </div>
    </Layout>
  );
};

export default ChangePassword;
