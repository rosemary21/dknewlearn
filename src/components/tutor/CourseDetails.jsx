// src/components/CourseDetails.js
import React, { useState } from 'react';

const CourseDetails = ({ onNext }) => {
  const [course, setCourse] = useState({
    group: '',
    category: '',
    title: '',
    price: ''
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(course);
  };

  return (
    <div>
      <h2>Course Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Group:
          <input type="text" name="group" value={course.group} onChange={handleChange} />
        </label>
        <label>
          Course Category:
          <input type="text" name="category" value={course.category} onChange={handleChange} />
        </label>
        <label>
          Course Title:
          <input type="text" name="title" value={course.title} onChange={handleChange} />
        </label>
        <label>
          Course Price:
          <input type="text" name="price" value={course.price} onChange={handleChange} />
        </label>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default CourseDetails;
