import React from 'react'
import TutorLayout from '../../components/tutor/TutorLayout'
import profile from "../../assets/profile1.webp";
import { Link } from 'react-router-dom';
const TutorSettings = () => {
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
          <label htmlFor="Email">Account Name</label>
          <input type="text" value={"Your Account Name"} disabled />

          <label htmlFor="Email">Account Number</label>
          <input type="text" value={"44364654756"} disabled />
<button className="submit-btn">Save</button>
</div>
    </div>
    </TutorLayout>
  )
}

export default TutorSettings