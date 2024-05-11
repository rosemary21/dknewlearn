import React from "react";
import TutorLayout from "../../components/tutor/TutorLayout";

const TutorEarnings = () => {

    const courses = [
        { name: 'Introduction to python', purchasedBy: 'Jake martin', amount: 'N10,000', date: '10th of may'},
        { name: 'Introduction to python', purchasedBy: 'Jake martin', amount: 'N10,000', date: '10th of may'},
        { name: 'Introduction to python', purchasedBy: 'Jake martin', amount: 'N10,000', date: '10th of may'},
        { name: 'Introduction to python', purchasedBy: 'Jake martin', amount: 'N10,000', date: '10th of may'},
        { name: 'Introduction to python', purchasedBy: 'Jake martin', amount: 'N10,000', date: '10th of may'},
    ]
  return (
    <TutorLayout><br />
      <h2>Tutor Earnings</h2><br />

      <table className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Title</th>
            <th>Purchased By</th>
            <th>Amount Paid</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
              <td>{course.name}</td>
              <td>{course.purchasedBy}</td>
              <td>{course.amount}</td>
              <td>{course.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TutorLayout>
  );
};

export default TutorEarnings;
