import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { checkout } from "../../services/cart";
import useAuth from "../../services/auth";

const Layout = ({ children }) => {
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isProfileNavVisible, setIsProfileNavVisible] = useState(false);

  const navigate = useNavigate()
 

  const [cart, setCart] = useState([]);

  const auth = useAuth()

  console.log(auth)

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const onToggleProfileNav = () => {
    setIsProfileNavVisible(!isProfileNavVisible);
  };

  const displayCart = () => {
    let cartItems = localStorage.getItem("cart");
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    } else {
      setCart([]);
    }
  };

  const addItemToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart!");
  };

  const removeItemFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Item removed from cart.");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    toast.warn("Cart cleared.");
  };



  useEffect(() => {
    displayCart();
  
  }, []);

const logout = () => {
    localStorage.clear()
    navigate("/")
}

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
 
                <button className="btn2 btn3" onClick={logout}>Logout</button>
            </p>
          </div>
        </div>
      )}

      {isCartVisible && (
        <div className={`cartPanel  ${auth.isAuth && 'shift-cart'}`}>
          {cart.length > 0 ? (
            <div>
              {cart.map((item, index) => (
                <div key={index}>
                  {index + 1}{')'} {item.name} - ₦{item.price}
                  <button onClick={() => removeItemFromCart(index)}>Remove</button>
                  <br /><br />
                </div>
              ))}
              <br />
              <div>
                <button className="btn3" onClick={() => checkout(auth)}>Check out</button>
                <button className="btn3" onClick={clearCart}>Clear Cart</button>
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
