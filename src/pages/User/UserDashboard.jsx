import React from "react";
import Layout from "../../components/home/Layout";

import '../../styles/dashboard.css'

import courseImg1 from "../../assets/course-img1.png";
import courseImg2 from "../../assets/course-img2.png";
import courseImg3 from "../../assets/course-img3.png";
import courseImg4 from "../../assets/course-img4.png";
import courseImg5 from "../../assets/course-img5.png";

import profileImg from "../../assets/profile1.webp";


const UserDashboard = () => {
  return (
    <Layout>
      <div className="dashboard">
        <div className="top-banner">

         <div className="profile">
         <img src={profileImg} alt="" style={{ width: '100px', height: '100px', borderRadius: '100%'}} />
         <p>Welcome, David Mark</p>


         </div>
        {/* My learning */}
        </div>
        <div className="main-section">
          <div className="section1">
            <h4>Schedule learning time</h4>
            <p>Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals. Set time aside to learn and get reminders using your learning scheduler.</p>
            <br />
            <button className="primary-btn">Get Started</button><span>&emsp; Dismiss</span>
          </div>

          <section class="courses-sec">
      <h1>My courses</h1>
 
      <input type="text" className="search-input" placeholder="Search your courses..." />
  
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
        <div class="explore-python">
          <div>
            <img src={courseImg1} alt="" />
            <h3>Learn Python: The Complete Python Programming Course</h3>
            <h4>Avinash Jain, The Codex</h4>
            <p>
              4.3 <i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star"></i><i class="fa fa-star"></i
              ><i class="fa fa-star-half-o"></i> <span>(4,253)</span>
            </p>
            <h3>$94.99</h3>
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
        </div>
        </div>
    </Layout>
  );
};

export default UserDashboard;
