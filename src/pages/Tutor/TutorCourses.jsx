import React from 'react'
import TutorLayout from '../../components/tutor/TutorLayout'


import courseImg1 from "../../assets/course-img1.png";
import courseImg2 from "../../assets/course-img2.png";
import courseImg3 from "../../assets/course-img3.png";
import courseImg4 from "../../assets/course-img4.png";
import courseImg5 from "../../assets/course-img5.png";
import { Link } from 'react-router-dom';

const TutorCourses = () => {
  return (
    <TutorLayout>
    <div className='tutor-courses'>
        <div className='top-banner panel'>
            <span>Jump Into Course Creation</span>
            <Link to={'/tutor/create-courses'}><button className='primary-btn'>Create Your course</button></Link> 
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

       
        </div>
      </div>
    </section>

    </div>
    </TutorLayout>
  )
}

export default TutorCourses