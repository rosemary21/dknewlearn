import React, { useEffect, useState } from 'react'
import TutorLayout from '../../components/tutor/TutorLayout'
import profile from "../../assets/profile1.webp";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api_url, token } from '../../config/config';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { getTutor } from '../../services/tutor';
const TutorSettings = () => {


  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");


  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getTutor();
        setData(userData.staffDto);
        setAccountNumber(userData.staffDto?.accountDetailDtoList[0]?.accountNumber)
        setAccountName(userData.staffDto?.accountDetailDtoList[0]?.accountName)
        setBankName(userData.staffDto?.accountDetailDtoList[0]?.bankName)
        setCurrency(userData.staffDto?.accountDetailDtoList[0]?.currency)

        


      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bankName || !accountNumber || !currency || !accountName) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    



    const formData = {
      fullName: data.fullName,
      gender: data.gender,
      age: data.age,
      accountDetailDtoList: [
        {
          accountName:accountName,
            accountNumber:accountNumber,
            bankName:bankName,
            currency:currency
        }
      ]
    }

    try {
      const response = await axios.post(`${api_url}/staff/update`, formData, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'application/json'
        }
      });

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

          <h3>{data?.fullName}</h3>

          <div>
            <Link to={'/tutor/change-password'} className='link-btn'><p>Change Password</p></Link>
          </div>
        </div>
        <div className='panel2'>
          <form onSubmit={handleSubmit}>
            <h3>Profile Information</h3><br />

            <label htmlFor="fullName">Full name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={data.fullName}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              disabled
            />

            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={data.phoneNumber}
              onChange={handleChange}
            />

            <label htmlFor="phone">Gender</label>


            <select name="gender"
              placeholder="Gender"
              value={data.gender}
              onChange={handleChange}>
              <option value="">Choose</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label htmlFor="phone">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={data.age}
              onChange={handleChange}
            />

            <label htmlFor="language">Your Language</label>
            <input
              type="text"
              name="language"
              value="English"
              onChange={handleChange}
              disabled
            />
            <br />


            <h2>Account Details</h2><br />

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