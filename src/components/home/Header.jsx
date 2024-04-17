import React from 'react'
import { FaBell, FaHeart, FaHome } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'
import profile from "../../assets/profile1.webp";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      {/* <section class="upper-nav">
        <p>
          Streamline your career success
          <span>| Start learning toward your next big milestone today.</span>
        </p>
      </section> */}
    <header>
        <Link to={'/'} className='header-logo'><h1>DK Learning</h1></Link>


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
            {/* <FaBell className='header-icons' />
            <FaCartShopping className='header-icons' />
            <FaHeart className='header-icons' />
            <img
            src={profile}
            alt="profile Image"
            className="profile-image"
          /> */}

          <Link to={'/login'}><button>Login</button></Link>
        </div>
    </header>
    </div>
  )
}

export default Header