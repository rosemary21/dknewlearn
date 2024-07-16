import React from 'react';

import courseImg1 from "../../assets/course-img1.png";
import { FaStar } from 'react-icons/fa';

const Course = ({ course }) => {
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
      <h3>₦{course.nairaPrice.toLocaleString()}</h3>
    </div>
  );
};

export default Course;
