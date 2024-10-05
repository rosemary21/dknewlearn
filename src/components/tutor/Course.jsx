import React from 'react';

import courseImg1 from "../../assets/course-img1.png";
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Course = ({ course, action }) => {

  const role = localStorage.getItem("role")
  return (
    <div>
      <img src={course?.courseImageUrl || courseImg1} alt="" />
      <h3>{course?.title}</h3>
      <h4>{course?.author}</h4>
      {/* <p>
        {course?.rating}{' '}
        {[...Array(Math.floor(course?.rating))].map((_, index) => (
          <i key={index} className="fa fa-star"></i>
        ))}
        {course?.rating % 1 !== 0 && (
          <i className="fa fa-star-half-o"></i>
        )}{' '}
        <span>({course?.numReviews})</span>
      </p> */}


      <p>
        5.0 <FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></p>
      <h3>₦{course?.nairaPrice?.toLocaleString()}</h3>

      {role == "tutor" && <div style={{ marginTop: "20px" }}>
        <Link to={`/tutor/edit-course/${course?.id}`}><button className='btn1'>edit</button></Link>

        <button className='btn2' style={{ padding: "9px 10px", marginLeft: "20px" }} onClick={() => action(course?.id)}>Delete</button>
      </div> }
      
    </div>
  );
};

export default Course;
