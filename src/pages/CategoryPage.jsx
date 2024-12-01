import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/home/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from '../components/ui/Pagination';
import { getCoursesByCategory } from '../services/user';
import { FaStar } from 'react-icons/fa';

const CategoryPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalData, setTotalData] = useState(0);


    const [category, setCategory] = useState("")
  
    const navigate = useNavigate()
  
    const courseContainerRef = useRef(null);

    const { id } = useParams();


    useEffect(() => {

        if (id == "SoftwareTester") {
            setCategory("Software Tester");
          } else if (id == "BackendEngineer") {
            setCategory("Backend Engineer");
          } else if (id == "DevopsEngineer") {
            setCategory("Devops Engineer");
          } else if (id == "ProductOwner") {
            setCategory("Product Owner");
          } else if (id == "FrontendEngineer") {
            setCategory("Frontend Engineer");
          } else if (id == "MobileEngineer") {
            setCategory("Mobile Engineer");
          }
          

        const fetchCategory = async () => {
            try {
              const courseData = await getCoursesByCategory(currentPage - 1, id);
          
              console.log(courseData?.coursesDtos)

              setCourses(courseData?.coursesDtos);
              setTotalData(courseData.totalData)
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          }

          fetchCategory()
    }, [currentPage]);





  const handleCourseClick = (course) => {
    navigate(`/course/${course.id}`);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {

    // Scroll to the top of the div
    courseContainerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  return (
    <Layout>



        {/*  Courses Section */}
        <section className="courses-sec" ref={courseContainerRef} >
       <br />
          <h1>{category || "Course"}</h1>

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
              <p>No courses available under this category at the moment.</p>
            )}


            <Pagination
              currentPage={currentPage}
              totalData={totalData}
              onPageChange={handlePageChange}
              onClick={handleNext} 
            />
          </div>
        </section>
    </Layout>
  )
}

export default CategoryPage