import React from 'react'
import Layout from '../components/home/Layout'
import courseImage from "../assets/course-img1.png";
import { FaStar } from 'react-icons/fa';


const SingleCoursePage = () => {


  function addToCart(item) {
    // Check if cart already exists in localStorage
    let cart = localStorage.getItem('cart');

    // If cart doesn't exist, create an empty array
    if (!cart) {
        cart = [];
    } else {
        // Parse existing cart from JSON
        cart = JSON.parse(cart);
    }

    // Add item to cart
    cart.push(item);

    // Store updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addCart = () => {
  addToCart({ id: 1, name: 'python course', price: '7000 naira' })
  location.reload()
}

  return (
    <Layout>
    <div className='course-page'>
      <div className='course-banner'>
        <div className="breadcrumb">
        Development {'>'}
Programming Languages {'>'}
Python
        </div><br />
        <div className='top-section'>
          <div>
          <h1>
        100 Days of Code: The Complete Python Pro Bootcamp
        </h1> <br />

        <p>Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!</p><br />

        <p>
          5.0 <span style={{color: 'gold'}}><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/> </span> 1,891,815 students
        </p><br />

        <p>Created by <b>Daniel Brills</b></p>

        <br /><br />
          </div>

          <div className='course-image'>
            <img src={courseImage} alt="" />
          </div>
        </div>
      </div><br />

      <div className="sections">
      <div  className="section1">
      <div className='sub-section1'>
        <h1>What you'll learn</h1><br />
        <div className="sub-points">
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
        </div>
      </div>

      <div className='sub-section2'>
        <p><h1>₦7,400</h1></p>

    <br /><br />
        <button className='btn1' onClick={addCart} >Add to cart</button>
        <button className='btn2'>Buy Now</button>

        <p>30-Day Money-Back Guarantee</p>
      </div>
      </div>
      </div>


      <br /><br /><br />
    </div>
    </Layout>
  )
}

export default SingleCoursePage