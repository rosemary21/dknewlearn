import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAllCourses } from "../../services/admin";
import { useNavigate } from "react-router-dom";

const AdminCourses = () => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getAllCourses();
        setCourses(userData?.coursesDtos);


        console.log(userData?.coursesDtos)
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const handleCourseClick = (course) => {
    // localStorage.setItem('selectedCourse', JSON.stringify(course));
    navigate(`/course/${course.id}`);
  };

  return (
    <AdminLayout>
      <div className="marginned">
        <br />
        <h2>All Courses</h2>
        <br />

        <div className="detail-card">
          <h3>Total Earnings </h3><br />
          <p>N100,000</p>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Title</th>
                <th>Amount</th>
                <th>Amount Paid</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {courses && courses.map((course, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{course?.title}</td>
                  <td>{course?.nairaPrice}</td>
                  <td>{course?.author}</td>
                  <td>{course?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCourses;
