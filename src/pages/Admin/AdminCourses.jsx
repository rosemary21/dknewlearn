import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAllCourses, updateCourse } from "../../services/admin";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/ui/Modal";
import { toast } from "react-toastify";
import Pagination from "../../components/ui/Pagination";
import { api_url } from "../../config/config";
import { FiSearch } from "react-icons/fi";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userData = await getAllCourses(currentPage - 1);
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

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const handleSearchChange = async (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
  
    if (value.length >= 3) {
      setLoading(true);
      try {

        const response = await fetch(`${api_url}/course/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            search: value,
            "pageSize":10,
            "pageNo":0
          }),
        });
        const data = await response.json();
        setCourses(data.coursesDtos); // Adjust according to your API response structure
    
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else if (value.length == 0) {
      fetchData();
    }
    else {
      setCourses([]);

    }
  };


  const getDate = (dateArray) => {
    const date = new Date(Date.UTC(
      dateArray[0],   // Year
      dateArray[1] - 1, // Month (JS months are 0-indexed, so subtract 1)
      dateArray[2],   // Day
      dateArray[3],   // Hour
      dateArray[4],   // Minute
      dateArray[5]    // Second
    ));
    
    // Format the date in a human-readable form
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });

    return formattedDate

  }
  

  return (
    <AdminLayout>
      <div className="marginned">
        <br />
        <h2>All Courses</h2>
        <br />

        <div className="detail-card">
          <h3>Total Courses</h3>
          <br />
          <p>{courses ? courses.length : 0}</p>
        </div>

        <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by course or author name here..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
      
          </div>
          <br />

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Title</th>
                <th>Amount</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((course, index) =>(
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td><Link to={`/course/${course?.id}`}>{course?.title}</Link> </td>
                    <td>{course?.nairaPrice}</td>
                    <td>{course?.author}</td>
                    <td>{course?.status}</td>
                    <td>{course?.timeCreated ? getDate(course?.timeCreated): "null"}</td>
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

export default AdminCourses;
