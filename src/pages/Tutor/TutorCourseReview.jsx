import React from "react";
import TutorLayout from "../../components/tutor/TutorLayout";

const TutorCourseReview = () => {

    const courses = [
        { name: 'Introduction to python', description: 'Introducing python basics to beginners', status: 'Approved', date: '10th of may'},
        { name: 'Introduction to python', description: 'Introducing python basics to beginners', status: 'Pending', date: '10th of may'},
        { name: 'Introduction to python', description: 'Introducing python basics to beginners', status: 'Rejected', date: '10th of may'},
        { name: 'Introduction to python', description: 'Introducing python basics to beginners', status: 'Approved', date: '10th of may'},
        { name: 'Introduction to python', description: 'Introducing python basics to beginners', status: 'In review', date: '10th of may'},
    ]
  return (
    <TutorLayout><br />
      <h2>Course Review</h2><br />

      <table className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.status}</td>
              <td>{course.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TutorLayout>
  );
};

export default TutorCourseReview;
