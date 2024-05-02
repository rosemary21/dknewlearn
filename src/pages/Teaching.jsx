import React from 'react'
import Layout from '../components/home/Layout'

import background from "../assets/background3.jpg";
import background2 from "../assets/background2.jpg";

import teaching1 from "../assets/teaching.jpg";
import teaching2 from "../assets/teaching2.jpg";
import teaching3 from "../assets/teaching3.jpg";
import { Link } from 'react-router-dom';



const Teaching = () => {
  return (
    <Layout>
        <div className="teaching">
        <div className="container">
          <img
            src={background} 
            alt="Background Image"
            className="background-image background-image1"
          />

<img
            src={background2} 
            alt="Background Image"
            className="background-image background-image2"
          />
          <div className="text-overlay">
            <h1>Come teach with us</h1><br />
            <p>Become an instructor and change lives — including your own</p><br />

            <Link to={'/tutor-signup'}><button className='primary-btn'>Get Started</button></Link> 
          </div>
        </div>

        <section>
            <h1>So many reasons to start</h1>

            <div className="reasons">
                <div>
                <img src={teaching1} alt="Teaching Image" />
                <h3>Teach your way</h3>
                <p>Publish the course you want, in the way you want, and always have control of your own content.</p>
                </div>

                <div>
                <img src={teaching2} alt="Teaching Image" />
                <h3>Teach your way</h3>
                <p>Publish the course you want, in the way you want, and always have control of your own content.</p>
                </div>

                <div>
                <img src={teaching3} alt="Teaching Image" />
                <h3>Teach your way</h3>
                <p>Publish the course you want, in the way you want, and always have control of your own content.</p>
                </div>
            </div>
        </section>
        </div>
    </Layout>
  )
}

export default Teaching