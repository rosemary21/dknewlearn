import React, { useEffect, useState } from 'react'
import Layout from '../../components/home/Layout'
import profile from "../../assets/profile1.webp";
import { Link } from 'react-router-dom';
import { getUser } from '../../services/user';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { api_url, token } from '../../config/config';
const EditProfile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();

        localStorage.setItem("user", JSON.stringify(userData.userDto))
        setUser(userData.userDto)

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
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.fullName || !user.phoneNumber) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
  

    const formData = {
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,

    }

    try {
      const response = await axios.post(`${api_url}/user/update`, formData, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success("Profile updated successfully!");

    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout>
      <div className='edit-profile'>
        <div className='panel1'>
          <img src={profile} alt="" className='profile-picture' /><br /><br />

          <h3>{user ? user?.fullName : 'User'}</h3>

          <div>
            <Link to={'/change-password'} className='link-btn'><p>Change Password</p></Link>
          </div>
        </div>
        <div className='panel2'>
        <form onSubmit={handleSubmit}>
          <h3>Profile Information</h3><br />

          <label htmlFor="Email">Full name</label>
          <input type="text" value={user?.fullName || ''} name='fullName' onChange={handleChange} placeholder="Full name" />
          
          <label htmlFor="Email">Email</label>
          <input type="email" value={user?.email || ''} placeholder="Email" disabled />

          <label htmlFor="Phone">Phone</label>
          <input type="number" value={user?.phoneNumber || ''} name='phoneNumber' onChange={handleChange} placeholder="Phone Number" />

          <label htmlFor="Email">Your Language</label>
          <input type="text" value={"English"} disabled />

          <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <FaSpinner className="spinner-icon" /> : "Save"}
            </button>


            </form>
        </div>

      </div>
    </Layout>
  )
}

export default EditProfile