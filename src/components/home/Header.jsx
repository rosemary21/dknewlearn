import React from 'react'
import { FaBell, FaHeart, FaHome } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'
import profile from "../../assets/profile1.webp";

const Header = () => {
  return (
    <header>
        <h1>Learning</h1>


        <div className="search-bar">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search courses here..."
        className="search-input"
      />
    
    </div>

    <div className='header-links'>
      <span>Categories</span>
      <span>Become a Teacher</span>
      <span>My learning</span>
    </div>
        <div className='header-aside'>
            <FaBell className='header-icons' />
            <FaCartShopping className='header-icons' />
            <FaHeart className='header-icons' />
            <img
            src={profile}
            alt="profile Image"
            className="profile-image"
          />
        </div>
    </header>
  )
}

export default Header