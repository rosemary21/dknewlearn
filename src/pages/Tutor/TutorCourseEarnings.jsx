import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../components/ui/Pagination";
import { getTutorCoursesEarnings } from "../../services/tutor";
import TutorLayout from "../../components/tutor/TutorLayout";

const TutorCourseEarnings = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const userData = await getTutorCoursesEarnings(currentPage - 1, id);
      setCourses(userData?.users);
      console.log(userData?.users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <TutorLayout>
      <div className="marginned">
        <br />
        <h2>Course Earnings</h2>
        <br />

        <div className="detail-card">
          <h3>Total Earnings</h3>
          <br />
          <p>0</p>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User name</th>
                <th>Email</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((course, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{course?.fullName}</td>
                    <td>{course?.email}</td>
                    <td>{course?.amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      </div>
    </TutorLayout>
  );
};

export default TutorCourseEarnings;
