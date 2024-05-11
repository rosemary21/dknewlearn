import React from 'react';

const Course = ({ course }) => {
  return (
    <div>
      <img src={course.imgSrc} alt="" />
      <h3>{course.title}</h3>
      <h4>{course.instructor}</h4>
      <p>
        {course.rating}{' '}
        {[...Array(Math.floor(course.rating))].map((_, index) => (
          <i key={index} className="fa fa-star"></i>
        ))}
        {course.rating % 1 !== 0 && (
          <i className="fa fa-star-half-o"></i>
        )}{' '}
        <span>({course.numReviews})</span>
      </p>
      <h3>${course.price}</h3>
      {course.bestseller && <button>Bestseller</button>}
    </div>
  );
};

export default Course;
