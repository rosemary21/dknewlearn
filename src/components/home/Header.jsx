import React, { useEffect, useRef, useState } from 'react'
import { FaBars, FaBell, FaHeart, FaHome } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'
import profile from "../../assets/profile1.webp";
import { Link } from 'react-router-dom';
import useAuth from '../../services/auth';
import { api_url } from '../../config/config';

const Header = ({ onToggleAside, toggleCart, onToggleProfileNav }) => {


  const auth = useAuth()

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const [cart, setCart] = useState(null);
  function displayCart() {
    // Get the cart data from localStorage
    let cartItems = localStorage.getItem("cart");

    // If cart data exists, parse it from JSON
    if (cartItems) {
      cartItems = JSON.parse(cartItems);

      setCart(cartItems);
    } else {
      // If cart data doesn't exist, display a message indicating an empty cart
      console.log("Cart is empty");
    }
  }

  useEffect(() => {
    displayCart();
  }, []);
  const dropdownRef = useRef();

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value.length >= 3) {
      setLoading(true);
      try {

        const response = await fetch(`${api_url}/course/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            search: value,
            "pageSize":10,
            "pageNo":0
          }),
        });
        const data = await response.json();
        setResults(data.coursesDtos); // Adjust according to your API response structure
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* <section class="upper-nav">
        <p>
          Streamline your career success
          <span>| Start learning toward your next big milestone today.</span>
        </p>
      </section> */}
      <header>
        <div className='toogle-nav'>
          <FaBars className='header-icons' onClick={onToggleAside} />
        </div>

        <Link to={'/'} className='header-logo'><h1>DK Learning</h1></Link>


   
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search courses here..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {showDropdown && (
              <div className="dropdown" ref={dropdownRef}>
                {loading ? (
                  <p>Loading...</p>
                ) : results.length > 0 ? (
                  results.map((result, index) => (
                    <div key={index} className="dropdown-item">
                      {result.title} {/* Adjust according to your data structure */}
                    </div>
                  ))
                ) : (
                  <p>No data found</p>
                )}
              </div>
            )}
          </div>
 

        <div className='header-links'>
          <Link to={'/categories'}><span>Categories</span></Link>
          <Link to={'/teaching'}><span>Become a Instructor</span></Link>
          {/* <span>My learning</span> */}
        </div>
        <div className='header-aside'>


         <Link to="/search"> <FiSearch className='header-icons search-icon2' /></Link>
          <FaCartShopping className='header-icons' onClick={toggleCart} /> <span className="red" onClick={toggleCart}>{cart ? cart.length : '0'}</span>





          {auth && auth.isAuth == true ? (
            <>

              <span className='header-icons2'><Link to={"/home/notifications"}><FaBell className='header-icons' /></Link>
              </span>
              <img
                src={profile}
                alt="profile Image"
                className="profile-image"

                onClick={onToggleProfileNav}
              />
            </>
          ) : (
            <span className='header-btn'>
              <Link to={'/login'} ><button>Login</button></Link>&emsp;
              <Link to={'/signup'} ><button className='btn2'>Signup</button></Link>
            </span>
          )}





        </div>
      </header>
    </div>
  )
}

export default Header