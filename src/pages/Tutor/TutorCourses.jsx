import React, { useEffect, useState } from 'react'
import TutorLayout from '../../components/tutor/TutorLayout'
import ReactPaginate from 'react-paginate';

import courseImg1 from "../../assets/course-img1.png";
import courseImg2 from "../../assets/course-img2.png";
import courseImg3 from "../../assets/course-img3.png";
import courseImg4 from "../../assets/course-img4.png";
import courseImg5 from "../../assets/course-img5.png";
import { Link } from 'react-router-dom';
import Course from '../../components/tutor/Course';
import { getTutor, getTutorCourses } from '../../services/tutor';
import { toast } from 'react-toastify';
import axios from 'axios';
import { api_url, token } from '../../config/config';
import Modal from '../../components/ui/Modal';
 
const TutorCourses = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);



  const fetchData = async () => {
    try {
      const userData = await getTutorCourses();
      setCourses(userData?.coursesDtos);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
 

    fetchData();
  }, []);

  const deleteCourseConfirm = async (id) => {

    setShow(true);


    setCourse(id)
  }

  const deleteCourse = async () => {

    const data = {
      "id":course
  }
  
    try {
      const response = await axios.post(`${api_url}/course/delete`, data, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'application/json'
        }
      }
      );
  
      toast.success("Course deleted")
      fetchData();
  
    } catch (error) {
      console.log("An error occurred. Please try again.", error);

      if (error.response.status == 400){
        toast.error(error.response.data.responseDto.message)
      } else{
        toast.error("An error occurred. Please try again.")
      }
    }
  }




  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const coursesPerPage = 4;

  const offset = currentPage * coursesPerPage;
  const paginatedCourses = courses?.slice(offset, offset + coursesPerPage);


  const hideModal = () => {
    setShow(false);
  };

  return (
    <TutorLayout>
      <div className='tutor-courses'>
        <div className='top-banner panel'>
          <span>Jump Into Course Creation</span>
          <Link to={'/tutor/create-courses'}><button className='primary-btn'>Create Your course</button></Link>
        </div>

        <section class="courses-sec">
          <h1>My courses</h1>

          {/* <input type="text" className="search-input" placeholder="Search your courses..." />

          <div class="course-links">
            <a href="#">Python</a>
            <a href="#">Product Design</a>
            <a href="#">Web Development</a>
            <a href="#">Cybersecurity</a>
            <a href="#">Data Science</a>
          </div> */}

          <div class="career-opportunities">
            <div class="explore-python explore-python2">


              {paginatedCourses?.map(course => (
                <Course key={course.id} course={course} action={deleteCourseConfirm} />
              ))}



            </div>
            <ReactPaginate
              previousLabel={'← Previous'}
              nextLabel={'Next →'}
              breakLabel={'...'}
              pageCount={Math.ceil(courses?.length / coursesPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </section>

      </div>

      <Modal show={show} handleClose={hideModal}>
      <h2>Confirm Delete</h2><br />
        <p>Are you sure you want to delete this <strong> course</strong>?</p><br /><br />
      
        <div className="modal-actions">
          <button className="btn2" style={{ position: "absolute", bottom: "20px", padding: "8px"}} onClick={deleteCourse}>Delete</button>
        </div>
      </Modal>
    </TutorLayout>
  )
}

export default TutorCourses