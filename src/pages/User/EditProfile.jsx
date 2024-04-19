import React from 'react'
import Layout from '../../components/home/Layout'
import profile from "../../assets/profile1.webp";
import { Link } from 'react-router-dom';
const EditProfile = () => {
  return (
    <Layout>
    <div className='edit-profile'>
        <div className='panel1'>
<img src={profile} alt="" className='profile-picture' /><br /><br />

<h3>David Mark</h3>

<div>
    <Link to={'/change-password'} className='link-btn'><p>Change Password</p></Link>
</div>
        </div>
        <div className='panel2'>
    <h3>Profile Information</h3><br />

    <label htmlFor="Email">Full name</label>
    <input type="text" placeholder="Full name" />
    <label htmlFor="Email">Email</label>
          <input type="email" placeholder="Email" disabled />
          <label htmlFor="Phone">Phone</label>
          <input type="number" placeholder="Phone Number" />
          <label htmlFor="Email">Your Language</label>
          <input type="text" value={"English"} disabled />
<button className="submit-btn">Save</button>
</div>
    </div>
    </Layout>
  )
}

export default EditProfile