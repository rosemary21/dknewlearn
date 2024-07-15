import React, { useEffect, useState } from "react";
import Layout from "../../components/home/Layout";

import '../../styles/dashboard.css'

import courseImg1 from "../../assets/course-img1.png";
import courseImg2 from "../../assets/course-img2.png";
import courseImg3 from "../../assets/course-img3.png";
import courseImg4 from "../../assets/course-img4.png";
import courseImg5 from "../../assets/course-img5.png";

import profileImg from "../../assets/profile1.webp";
import { getUser } from "../../services/user";
import ReactPaginate from "react-paginate";
import Course from "../../components/tutor/Course";


const UserDashboard = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        
        setCourses(userData.courses);

        localStorage.setItem("user", JSON.stringify(userData.userDto))
        setUser(userData.userDto)

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const coursesPerPage = 4;
  const offset = currentPage * coursesPerPage;
  const paginatedCourses = courses?.slice(offset, offset + coursesPerPage);

  
  return (
    <Layout>
      <div className="dashboard">
        <div className="top-banner">

         <div className="profile">
         <img src={profileImg} alt="" style={{ width: '100px', height: '100px', borderRadius: '100%'}} />
         <p>Welcome, {user && user?.fullName}</p>


         </div>
        {/* My learning */}
        </div>
        <div className="main-section">
          <div className="section1">
            <h4>Schedule learning time</h4>
            <p>Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals. Set time aside to learn and get reminders using your learning scheduler.</p>
            <br />
            <button className="primary-btn">Get Started</button><span>&emsp; Dismiss</span>
          </div>

          <section class="courses-sec">
          <h1>My courses</h1>

          <input type="text" className="search-input" placeholder="Search your courses..." />

          <div class="course-links">
            <a href="#">Python</a>
            <a href="#">Excel</a>
            <a href="#">Web Development</a>
            <a href="#">JavaScript</a>
            <a href="#">Data Science</a>
            <a href="#">AWS Certification</a>
            <a href="#">Drawing</a>
          </div>

          <div class="career-opportunities">
            <div class="explore-python">


              {paginatedCourses?.map(course => (
                <Course key={course.id} course={course} />
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
        </div>
    </Layout>
  );
};

export default UserDashboard;
