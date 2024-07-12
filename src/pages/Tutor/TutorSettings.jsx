import React, { useState } from 'react'
import TutorLayout from '../../components/tutor/TutorLayout'
import profile from "../../assets/profile1.webp";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api_url, token } from '../../config/config';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
const TutorSettings = () => {


  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  

  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bankName || !accountNumber || !currency || !accountName) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${api_url}/staff/update`, {
        bankName,
        accountNumber,
        currency,
        accountName
      }, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'application/json'
        }});

      toast.success("Account details saved successfully!");

    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <TutorLayout>
      <div className='edit-profile'>
        <div className='panel1'>
          <img src={profile} alt="" className='profile-picture' /><br /><br />

          <h3>David Mark</h3>

          <div>
            <Link to={'/tutor/change-password'} className='link-btn'><p>Change Password</p></Link>
          </div>
        </div>
        <div className='panel2'>
          <form onSubmit={handleSubmit}>
            <h3>Profile Information</h3><br />

            <label htmlFor="Email">Full name</label>
            <input type="text" placeholder="Full name" />
            <label htmlFor="Email">Email</label>
            <input type="email" placeholder="Email" disabled />
            <label htmlFor="Phone">Phone</label>
            <input type="number" placeholder="Phone Number" />
            <label htmlFor="Email">Your Language</label>
            <input type="text" value={"English"} disabled />
            <br />


            <h2>Account Details</h2>

            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
            />

            <label htmlFor="accountNumber">Account Name</label>
            <input
              type="text"
              id="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />

            <label htmlFor="accountNumberConfirm">Account Number</label>
            <input
              type="text"

              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />

            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            >
              <option value="">Select Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="Naira">Naira</option>
              {/* Add more currencies as needed */}
            </select>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <FaSpinner className="spinner-icon" /> : "Save"}
            </button>
          </form>
        </div>
      </div>
    </TutorLayout>
  )
}

export default TutorSettings