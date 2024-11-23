import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/home/Layout";
import '../styles/main.css'

import courseImg1 from "../assets/default.png";

import instructorImg from "../assets/images/img (8).jpg"
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Slider } from "../components/home/Slider";
import { getCourses } from "../services/user";
import Pagination from "../components/ui/Pagination";



const HomePage = () => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);

  const navigate = useNavigate()

  const courseContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getCourses(currentPage - 1);
        setCourses(userData?.coursesDtos);


        console.log(userData?.coursesDtos)
        setTotalData(userData.totalData)
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);



  const handleCourseClick = (course) => {
    navigate(`/course/${course.id}`);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {

    // Scroll to the top of the div
    courseContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <Layout>

        <section>
          <Slider />
        </section>

        {/*  Courses Section */}
        <section className="courses-sec" ref={courseContainerRef} >
          <h1>A broad selection of courses</h1>
          <p>
            Choose from 100 online video courses with new additions published
            every month
          </p>


          <div className="career-opportunities">

            {courses && courses.length > 0 ? (
              <div className="explore-python">
                {courses.map((course, index) => (
                  <div key={index} onClick={() => handleCourseClick(course)}>
                    <img src={course?.courseImageUrl || courseImg1} alt={course.title} style={{ height: "200px"}} />
                    <h3>{course.title}</h3>
                    <p>{course.author}</p>
                    <p>
                    5.0 <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </p>
                    <h3>₦{course.nairaPrice.toLocaleString()}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p>No courses available at the moment.</p>
            )}


            <Pagination
              currentPage={currentPage}
              totalData={totalData}
              onPageChange={handlePageChange}
              onClick={handleNext} 
            />
          </div>
        </section>

        {/* Featured Section */}
        <section className="featured">
          <div className='categories-page'>
            <div>
              <h1>Featured Categories</h1>
            </div><br />

            <div className='categories-list'>
              <p style={{ background: "white" }}>Web Development</p>
              <p style={{ background: "white" }}>Product Design</p>
              <p style={{ background: "white" }}>Cybersecurity</p>
              <p style={{ background: "white" }}>Web Development</p>

            </div>

            {/* <Link to={"/categories"}><button className="btn3">Explore more categories</button></Link> */}
          </div>
        </section>


        {/* Instructor Section */}
        <section className="instructor">
          <div className="instructor-img">
            <img src={instructorImg} alt="" style={{ maxWidth: "400px" }} />
          </div>

          <div>
            <h2>Become an instructor</h2>
            <p>
              Instructors from around the world teach millions of students on DK Learning.
              We provide the tools and skills to teach what you love.
            </p>
            <Link to={'/teaching'}>  <button className="black-btn">Start teaching today</button></Link>
          </div>
        </section>

      </Layout>
    </div>
  );
};

export default HomePage;
