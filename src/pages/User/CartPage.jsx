import React from 'react'
import Layout from '../../components/home/Layout'
import emptyCart from "../../assets/img/empty-shopping-cart.jpg";
import { Link } from 'react-router-dom';

const CartPage = () => {
  return (
    <Layout>
    <div className='cart-page'>
    <br /><br />
        <h1>Shopping Cart</h1><br />
        <p><b>0 Courses in Cart</b></p>
        <div className='section1'>
            <div>
    <img src={emptyCart} alt="" /><br /><br />
    <p>Your cart is empty. Keep shopping to find a course!</p><br /><br /><br />

    <Link to={'/'}><button className='primary-btn'>Keep shopping</button></Link>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default CartPage