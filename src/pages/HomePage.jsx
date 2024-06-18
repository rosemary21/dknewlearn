import React from "react";
import Layout from "../components/home/Layout";
import background from "../assets/background1.jpg";
// import background from "../assets/hero-bg.png";

import '../styles/main.css'

import courseImg1 from "../assets/course-img1.png";
import courseImg2 from "../assets/course-img2.png";
import courseImg3 from "../assets/course-img3.png";
import courseImg4 from "../assets/course-img4.png";
import courseImg5 from "../assets/course-img5.png";
import courseImg6 from "../assets/course-img6.png";
import courseImg7 from "../assets/course-img7.png";
import courseImg8 from "../assets/course-img8.png";
import courseImg9 from "../assets/course-img9.png";
import courseImg10 from "../assets/course-img10.png";


import quote from "../assets/quote.svg.png"

import play from "../assets/play.png"
import WA from "../assets/WA.png"
import RF from "../assets/RF.png"
import PW from "../assets/PW.png"


import nasdaq from "../assets/nasdaq-dark.svg.png";
import volkswagen from "../assets/volkswagen-dark.svg.png";
import boxDark from "../assets/box-dark.svg.png";
import netapp from "../assets/netapp-dark.svg.png";
import eventbrite from "../assets/eventbrite-dark.svg.png";
import tcs from "../assets/tcs-dark.svg.png"
import instructorImg from "../assets/images/img (8).jpg"
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

// import tcs from "../assets/tcs-dark.svg.png";
// import img from "../assets/background.jpg";
// import img from "../assets/background.jpg";


const HomePage = () => {
  return (
    <div>
      <Layout>
        <div className="container">
          <img
            src={background} 
            alt="Background Image"
            className="background-image"
          />
          <div className="text-overlay">
            <h1>Get the best Courses Here</h1><br />
            <p>We have courses covering a whole lot of fields that you can try out</p>
          </div>
        </div>

        {/*  Courses Section */}
    <section class="courses-sec">
      <h1>A broad selection of courses</h1>
      <p>
        Choose from 213,000 online video courses with new additions published
        every month
      </p>
      <div class="course-links">
        <a href="#">Python</a>
        <a href="#">Excel</a>
        <a href="#">Web Development</a>
        <a href="#">JavaScript</a>
        <a href="#">Data Science</a>
        <a href="#">AWS Certification</a>
        <a href="#">Drawing</a>
      </div>

      <div class="career-opportunities">
        <div>
          <h2>Expand your career opportunities with Python</h2>
          <p>
            Take one of DK Learning’s range of Python courses and learn how to code
            using this incredibly useful language. Its simple syntax and
            readability makes Python perfect for Flask, Django, data science,
            and machine learning. You’ll learn how to build everything from
            games to sites to apps. Choose from a range of courses that will
            appeal to both beginners and advanced developers alike.
          </p>
          <button class="career-btn">Explore Python</button>
        </div>

        <div class="explore-python">
         
         <div>
         <Link to={'/course/python-course'}>
            <img src={courseImg1} alt="" />
            <h3>Learn Python: The Complete Python Programming Course</h3>
            <h4>Avinash Jain, The Codex</h4>
            <p>
              4.3 <i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star-half-o"></i> <span>(4,253)</span>
            </p>
            <h3>$94.99</h3>
            </Link>
          </div>
  

          <div>
            <img src={courseImg2} alt="" />
            <h3>Learning Python for Data Analysis and Visualization Ver 1</h3>
            <h4>Jose Portilla</h4>
            <p>
              4.3 <i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star-half-o"></i> <span>(18,586)</span>
            </p>
            <h3>$119.99</h3>
            <button>Bestseller</button>
          </div>

          <div>
            <img src={courseImg3} alt="" />
            <h3>Python for Beginners - Learn Programming from scratch</h3>
            <h4>Edwin Diaz, Coding Faculty Solutions</h4>
            <p>
              4.3 <i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star-half-o"></i> <span>(2,350)</span>
            </p>
            <h3>$84.99</h3>
          </div>

          <div>
            <img src={courseImg4} alt="" />
            <h3>Learn Python: Python for Beginners</h3>
            <h4>Abrar Hussain</h4>
            <p>
              4.3 <i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star-half-o"></i> <span>(2,822)</span>
            </p>
            <h3>$29.99</h3>
          </div>

          <div>
            <img src={courseImg5} alt="" />
            <h3>Python From Scratch & Selenium WebDriver QA</h3>
            <h4>Admas Kinfu</h4>
            <p>
              4.3 <i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star-half-o"></i> <span>(2,323)</span>
            </p>
            <h3>$109.99</h3>
            <button>Bestseller</button>
          </div>
        </div>
      </div>
    </section>

   
    {/*  Viewing Section */}
    <section className="viewing">
      <h2>Students are viewing</h2>
      <div className="explore-python views">
        <div>
          <img src={courseImg6} alt="" />
          <h3>The Complete 2023 Web Development Bootcamp</h3>
          <h4>Dr. Angela Yu</h4>
          <p>
            4.3 <FaStar/><FaStar/><FaStar/><FaStar/>  <span>(247,955)</span>
          </p>
          <h3>$119.99</h3>
          <button>Bestseller</button>
        </div>

        <div>
          <img src={courseImg7} alt="" />
          <h3>100 Days of Code: The Complete Python Pro Bootcamp for 2023</h3>
          <h4>Dr. Angela Yu</h4>
          <p>
            4.3 <FaStar/><FaStar/><FaStar/><FaStar/> <span>(162,432)</span>
          </p>
          <h3>$84.99</h3>
          <button>Bestseller</button>
        </div>

        <div>
          <img src={courseImg8} alt="" />
          <h3>The Complete JavaScript Course 2023: From Zero to Expert!</h3>
          <h4>Jonas Schmedtmann</h4>
          <p>
            4.3 <FaStar/><FaStar/><FaStar/><FaStar/> <span>(161,454)</span>
          </p>
          <h3>$149.99</h3>
          <button>Bestseller</button>
        </div>

        <div>
          <img src={courseImg9} alt="" />
          <h3>React - The Complete Guide (incl Hooks, React Router, Redux)</h3>
          <h4>Academind by Maximilian Schwarzmüller,</h4>
          <p>
            4.3 <FaStar/><FaStar/><FaStar/><FaStar/> <span>(171,292)</span>
          </p>
          <h3>$129.99</h3>
          <button>Bestseller</button>
        </div>

        <div>
          <img src={courseImg10} alt="" />
          <h3>Ultimate AWS Certified Solutions Architect Associate</h3>
          <h4>Stephane Maarek | AWS Certified Cloud</h4>
          <p>
            4.3 <FaStar/><FaStar/><FaStar/><FaStar/><span>(160,038)</span>
          </p>
          <h3>$84.99</h3>
          <button>Bestseller</button>
        </div>
      </div>
    </section>

    {/* Featured Section */}
    <section class="featured">
      <div className='categories-page'>
        <div>
          <h1>Featured Categories</h1>
        </div><br />

        <div className='categories-list'>
          <p style={{background: "white"}}>Web Development</p>
          <p style={{background: "white"}}>Product Design</p>
          <p style={{background: "white"}}>Cybersecurity</p>
          <p style={{background: "white"}}>Web Development</p>

        </div>

        {/* <Link to={"/categories"}><button className="btn3">Explore more categories</button></Link> */}
      </div>
    </section>


    {/* Instructor Section */}
    <section className="instructor">
      <div className="instructor-img">
        <img src={instructorImg} alt="" style={{ maxWidth: "400px"}}/>
      </div>

      <div>
        <h2>Become an instructor</h2>
        <p>
          Instructors from around the world teach millions of students on DK Learning.
          We provide the tools and skills to teach what you love.
        </p>
      <Link to={'/teaching'}>  <button className="black-btn">Start teaching today</button></Link>
      </div>
    </section>

      </Layout>
    </div>
  );
};

export default HomePage;
