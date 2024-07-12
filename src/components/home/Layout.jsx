import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.css";
import { Link } from "react-router-dom";


import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({ children }) => {
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isProfileNavVisible, setIsProfileNavVisible] = useState(false);


  const [cart, setCart] = useState(null);

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const onToggleProfileNav = () => {
    setIsProfileNavVisible(!isProfileNavVisible);
  };




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

  // Call the displayCart function to initially display the cart data


  useEffect(() => {
    displayCart();
  }, []);

  return (
    <div>
      <Header onToggleAside={toggleAside} toggleCart={toggleCart} onToggleProfileNav={onToggleProfileNav} />

      {isAsideVisible && (
        <div className="mobile-nav">
          <div className="sub-mobile-nav">
            <Link to={"/categories"}>
              <p className="nav-link">Categories</p>
            </Link>
            <p className="nav-link">Become a teacher</p>
            <br />
            <p>
              <Link to={"/login"}>
                <button>Login</button>
              </Link>
            </p>
            <p>
              {" "}
              <Link to={"/signup"}>
                <button className="btn2">Signup</button>
              </Link>
            </p>
          </div>
        </div>
      )}


      {isProfileNavVisible && (
        <div className="profile-nav">
          <div className="">
            <Link to={"/home/my-courses"}>
              <p className="nav-link">My Learning</p>
            </Link>
            <Link to={"/home/cart"}>
              <p className="nav-link">Cart</p>
            </Link>
            <Link to={"/home/notifications"}>
              <p className="nav-link">Notifications</p>
            </Link>
            <Link to={"/subscriptions"}>
              <p className="nav-link">My Subscriptions</p>
            </Link>
            <Link to={"/edit-profile"}>
              <p className="nav-link">Profile</p>
            </Link>

            <p>
              <Link to={"/login"}>
                <button className="btn2 btn3">Logout</button>
              </Link>
            </p>
          </div>
        </div>
      )}

      {isCartVisible && (
        <div className="cartPanel">
          {cart !== null && cart.length > 0 ? (
            <div>
              {cart.map((item, index) => (
                <div key={index}>
                  {index + 1}{')'} {item.name} - {item.price}


                  <br /><br />
                </div>
              ))}


              <br />

              <div>
                <button className="btn3">Check out</button>
              </div>
            </div>
          ) : (
            <div>
              <p>Your cart is empty</p>

              <p>Keep Shopping</p>
            </div>
          )}
        </div>
      )}

      <main className="user-main-content">
        {children}

        <Footer />

        <ToastContainer />
      </main>
    </div>
  );
};

export default Layout;
