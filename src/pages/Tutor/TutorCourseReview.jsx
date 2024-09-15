import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../components/ui/Pagination";
import { getTutorCourses } from "../../services/tutor";
import TutorLayout from "../../components/tutor/TutorLayout";

const TutorCourseReview = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState('');


  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userData = await getTutorCourses(currentPage - 1);
      setCourses(userData?.coursesDtos);
      setTotalData(userData?.totalData)
      console.log(userData?.coursesDtos);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Unable to get all courses at the moment, please try again later")
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

  const handleCourseClick = (course) => {
    navigate(`/course/${course.id}`);
  };

  const showModal = (course) => {
    setSelectedCourse(course);
    setStatus(course?.status);
  };

  const hideModal = () => {
    setSelectedCourse(null);
  };

  return (
    <TutorLayout>
      <div className="marginned">
        <br />
        <h2>All Courses</h2>
        <br />

        <div className="detail-card">
          <h3>Total Courses</h3>
          <br />
          <p>{courses ? courses.length: 0}</p>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Title</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((course, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{course?.title}</td>
                    <td>{course?.nairaPrice}</td>
                    <td>{course?.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Pagination
        currentPage={currentPage}
        totalData={totalData}
        onPageChange={handlePageChange}
      />


      </div>
    </TutorLayout>
  );
};

export default TutorCourseReview;
