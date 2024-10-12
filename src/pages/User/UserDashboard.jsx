import React, { useEffect, useState } from "react";
import Layout from "../../components/home/Layout";
import '../../styles/dashboard.css'
import profileImg from "../../assets/profile1.png";
import { getUser } from "../../services/user";
import ReactPaginate from "react-paginate";
import Course from "../../components/tutor/Course";
import { Link } from "react-router-dom";
import loadingImage from "../../assets/loading.gif"


const UserDashboard = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();


        console.log(userData.courses)
        
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
    return <div className="loading-screen"><div>
      <img src={loadingImage} alt="Loading..." />
      </div></div>;
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
            <h4>Check out other courses</h4>
            <br />
            <p>Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals.</p>
            <br />
            <Link to="/"><button className="primary-btn">View</button></Link>
          </div>

          <section class="courses-sec">
          <h1>My courses</h1>

          <div class="career-opportunities">
            <div class="explore-python">


              {paginatedCourses?.map(course => (
                <Link to={`/view-course/${course.id}`} key={course.id} >
                <Course course={course} />
                </Link>
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
