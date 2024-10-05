import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { checkout } from "../../services/cart";
import useAuth from "../../services/auth";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";

const Layout = ({ children }) => {
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isProfileNavVisible, setIsProfileNavVisible] = useState(false);

  const { cart, removeItemFromCart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(null);

  const auth = useAuth()

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const onToggleProfileNav = () => {
    setIsProfileNavVisible(!isProfileNavVisible);
  };

  const role = localStorage.getItem("role") || null

  const checkoutOne = () => {
    setLoading(true)
    checkout(auth)
  }

const logout = () => {
    localStorage.clear()
    window.location.href = "/"
}

  return (
    <div className="home">
      <Header onToggleAside={toggleAside} toggleCart={toggleCart} onToggleProfileNav={onToggleProfileNav} />

      {isAsideVisible && (
        <div className="mobile-nav">
          <div className="sub-mobile-nav">
            <Link to={"/categories"}>
              <p className="nav-link">Categories</p>
            </Link>
            <Link to={"/teaching"}>
            <p className="nav-link">Signup as teacher</p>
            </Link>
            <br />
            <p>
              <Link to={"/login"}>
                <button>Login</button>
              </Link>
            </p>
            <p>
              <Link to={"/signup"}>
                <button className="btn2">Signup</button>
              </Link>
            </p>
          </div>
        </div>
      )}

      {isProfileNavVisible && (


        <div className="profile-nav">

          {role == "user" ? (
              <div className="">



              <Link to={"/home/my-courses"}>
                <p className="nav-link">My Learning</p>
              </Link>
              <Link to={"/home/cart"}>
                <p className="nav-link">Cart</p>
              </Link>
              <Link to={"/edit-profile"}>
                <p className="nav-link">Profile</p>
              </Link>
              <Link to={"/change-password"}>
                <p className="nav-link">Change Password</p>
              </Link>
              <p>
   
                  <button className="btn2 btn3" onClick={logout}>Logout</button>
              </p>
            </div>

          ) : role == "tutor" ? (
            <div className="">
            <Link to={"/tutor"}>
              <p className="nav-link">Dashboard</p>
            </Link>
            <Link to={"/tutor/settings"}>
              <p className="nav-link">Settings</p>
            </Link>
            <Link to={"/tutor/change-password"}>
              <p className="nav-link">Change Password</p>
            </Link>
            <p>
 
                <button className="btn2 btn3" onClick={logout}>Logout</button>
            </p>
          </div>
          ) : role == "admin" ? (
            <div className="">
            <Link to={"/admin"}>
              <p className="nav-link">Dashboard</p>
            </Link>
            <p>
 
                <button className="btn2 btn3" onClick={logout}>Logout</button>
            </p>
          </div>
          ) : (
            <>
            </>
          ) }
        
        </div>
      )}

      {isCartVisible && (
        <div className={`cartPanel  ${auth.isAuth && 'shift-cart'}`}> 
          {cart.length > 0 ? (
            <div>
              {cart.map((item, index) => (
                <div key={index}  className="flex-justify-sb cart-item" >
                  {item.name} - ₦{item.price}
                  <span onClick={() => removeItemFromCart(index)} style={{ color: "red", cursor: "pointer"}}><FaTrash/></span>
                  
                </div>
              ))}
              <br /><br />
              <div className="flex-justify-sb">
                <button className="btn2" style={{ padding: "10px"}} onClick={checkoutOne} disabled={loading}>{loading ? 'Loading...' : 'Check out'}</button>
                <button className="btn3" style={{ width: "auto", padding: "10px"}} onClick={clearCart}>Clear Cart</button>
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
        <div className="main-container">
        {children}
        </div>
        <Footer />
        <ToastContainer />
      </main>
    </div>
  );
};

export default Layout;
