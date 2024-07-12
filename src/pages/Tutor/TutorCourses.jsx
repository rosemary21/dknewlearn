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
import { getTutor } from '../../services/tutor';

const TutorCourses = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getTutor();
        setCourses(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const coursesPerPage = 4;
  // const courses = [
  //   {
  //     id: 1,
  //     imgSrc: courseImg1,
  //     title: 'Learn Python: The Complete Python Programming Course',
  //     instructor: 'Avinash Jain, The Codex',
  //     rating: 4.3,
  //     numReviews: 4253,
  //     price: 94.99,
  //     bestseller: false,
  //   },
  //   {
  //     id: 2,
  //     imgSrc: courseImg2,
  //     title: 'Learning Python for Data Analysis and Visualization Ver 1',
  //     instructor: 'Jose Portilla',
  //     rating: 4.3,
  //     numReviews: 18586,
  //     price: 119.99,
  //     bestseller: true,
  //   },
  //   {
  //     id: 3,
  //     imgSrc: courseImg1,
  //     title: 'Learn Python: The Complete Python Programming Course',
  //     instructor: 'Avinash Jain, The Codex',
  //     rating: 4.3,
  //     numReviews: 4253,
  //     price: 94.99,
  //     bestseller: false,
  //   },
  //   {
  //     id: 4,
  //     imgSrc: courseImg2,
  //     title: 'Learning Python for Data Analysis and Visualization Ver 1',
  //     instructor: 'Jose Portilla',
  //     rating: 4.3,
  //     numReviews: 18586,
  //     price: 119.99,
  //     bestseller: true,
  //   },
  //   {
  //     id: 5,
  //     imgSrc: courseImg1,
  //     title: 'Learn Python: The Complete Python Programming Course',
  //     instructor: 'Avinash Jain, The Codex',
  //     rating: 4.3,
  //     numReviews: 4253,
  //     price: 94.99,
  //     bestseller: false,
  //   },
  //   {
  //     id: 6,
  //     imgSrc: courseImg2,
  //     title: 'Learning Python for Data Analysis and Visualization Ver 1',
  //     instructor: 'Jose Portilla',
  //     rating: 4.3,
  //     numReviews: 18586,
  //     price: 119.99,
  //     bestseller: true,
  //   },
  //   {
  //     id: 7,
  //     imgSrc: courseImg1,
  //     title: 'Learn Python: The Complete Python Programming Course',
  //     instructor: 'Avinash Jain, The Codex',
  //     rating: 4.3,
  //     numReviews: 4253,
  //     price: 94.99,
  //     bestseller: false,
  //   },
  //   {
  //     id: 8,
  //     imgSrc: courseImg2,
  //     title: 'Learning Python for Data Analysis and Visualization Ver 1',
  //     instructor: 'Jose Portilla',
  //     rating: 4.3,
  //     numReviews: 18586,
  //     price: 119.99,
  //     bestseller: true,
  //   },
  //   {
  //     id: 9,
  //     imgSrc: courseImg1,
  //     title: 'Learn Python: The Complete Python Programming Course',
  //     instructor: 'Avinash Jain, The Codex',
  //     rating: 4.3,
  //     numReviews: 4253,
  //     price: 94.99,
  //     bestseller: false,
  //   },
  //   {
  //     id: 10,
  //     imgSrc: courseImg2,
  //     title: 'Learning Python for Data Analysis and Visualization Ver 1',
  //     instructor: 'Jose Portilla',
  //     rating: 4.3,
  //     numReviews: 18586,
  //     price: 119.99,
  //     bestseller: true,
  //   },
  //   // Add more courses as needed
  // ];


  const offset = currentPage * coursesPerPage;
  const paginatedCourses = courses?.slice(offset, offset + coursesPerPage);




  
  
  return (
    <TutorLayout>
    <div className='tutor-courses'>
        <div className='top-banner panel'>
            <span>Jump Into Course Creation</span>
            <Link to={'/tutor/create-courses'}><button className='primary-btn'>Create Your course</button></Link> 
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
    </TutorLayout>
  )
}

export default TutorCourses