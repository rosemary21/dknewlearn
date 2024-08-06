import React, { useEffect, useState } from "react";
import Layout from "../components/home/Layout";
import background from "../assets/background1.jpg";
// import background from "../assets/hero-bg.png";

import '../styles/main.css'

import courseImg1 from "../assets/course-img1.png";
import courseImg2 from "../assets/course-img2.png";
import courseImg3 from "../assets/course-img3.png";
import courseImg4 from "../assets/course-img4.png";
import courseImg5 from "../assets/course-img5.png";
import courseImg6 from "../assets/course-img6.png";
import courseImg7 from "../assets/course-img7.png";
import courseImg8 from "../assets/course-img8.png";
import courseImg9 from "../assets/course-img9.png";
import courseImg10 from "../assets/course-img10.png";


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

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getCourses(currentPage - 1);
        setCourses(userData?.coursesDtos);


        console.log(userData?.coursesDtos)
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);



  const handleCourseClick = (course) => {
    // localStorage.setItem('selectedCourse', JSON.stringify(course));
    navigate(`/course/${course.id}`);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Layout>
        {/* <div className="container">
          <img
            src={background} 
            alt="Background Image"
            className="background-image"
          />
          <div className="text-overlay">
            <h1>Get the best Courses Here</h1><br />
            <p>We have courses covering a whole lot of fields that you can try out</p>
          </div>
        </div> */}

        {/* <section className="hero">
          <Slider {...settings} className='carousel'>
            <div className='carousel-item carousel-item1'>
              <div className='carousel-text slide1'>
                <h2>Text for Image 1</h2>
                <p>Description for Image 1</p>
              </div>
            </div>
            <div className='carousel-item' style={{ backgroundImage: 'url(/path/to/your/image2.jpg)' }}>
              <div className='carousel-text'>
                <h2>Text for Image 2</h2>
                <p>Description for Image 2</p>
              </div>
            </div>
            <div className='carousel-item' style={{ backgroundImage: 'url(/path/to/your/image3.jpg)' }}>
              <div className='carousel-text'>
                <h2>Text for Image 3</h2>
                <p>Description for Image 3</p>
              </div>
            </div>
          </Slider>
        </section> */}

        <section>
          <Slider />
        </section>

        {/*  Courses Section */}
        <section class="courses-sec">
          <h1>A broad selection of courses</h1>
          <p>
            Choose from 100 online video courses with new additions published
            every month
          </p>
          <div class="course-links">
            <a href="#">Python</a>
            <a href="#">Cybersecurity</a>
            <a href="#">Web Development</a>
            <a href="#">Product Design</a>
            <a href="#">Data Science</a>
          </div>

          <div class="career-opportunities">

            {courses && courses.length > 0 ? (
              <div className="explore-python">
                {courses.map((course, index) => (
                  <div key={index} onClick={() => handleCourseClick(course)}>
                    <img src={course?.courseImageUrl || courseImg1} alt={course.title} />
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
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </section>

        {/* Featured Section */}
        <section class="featured">
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
