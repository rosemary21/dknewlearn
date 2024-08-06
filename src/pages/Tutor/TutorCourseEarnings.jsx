import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAllCourses, updateCourse } from "../../services/admin";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/ui/Modal";
import { toast } from "react-toastify";
import Pagination from "../../components/ui/Pagination";
import { getTutorCoursesEarnings } from "../../services/tutor";

const TutorCourseEarnings = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userData = await getTutorCoursesEarnings(currentPage - 1, id);
      setCourses(userData?.coursesDtos);
      console.log(userData?.coursesDtos);
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

  const update = async (id) => {
    try {
      setLoading(true);

      const data = await updateCourse(id, status);

      console.log(data);
      hideModal();
      toast.success("Course updated successfully");

      fetchData();
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="marginned">
        <br />
        <h2>Courses Earnings</h2>
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
                <th>Course Title</th>
                <th>Amount</th>
                <th>Author</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((course, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{course?.title}</td>
                    <td>{course?.nairaPrice}</td>
                    <td>{course?.author}</td>
                    <td>{course?.status}</td>
                    <td>
                      <button onClick={() => showModal(course)}>Update</button>
                    </td>
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

        {selectedCourse && (
          <Modal show={true} handleClose={hideModal}>
            <h2>Update Course</h2>
            <br />
            <h3>Course Title: {selectedCourse?.title}</h3>
            <br />
            <br />
            <label htmlFor="">Change Course Status</label>
            <br />
            <br />
            <select
              name="status"
              id=""
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <br />
            <br />
            <button
              onClick={() => update(selectedCourse?.id)}
              className="succes-btn"
              disabled={loading}
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};

export default TutorCourseEarnings;
