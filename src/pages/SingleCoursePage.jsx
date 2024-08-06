import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/home/Layout'
import courseImage from "../assets/course-img1.png";
import { FaStar } from 'react-icons/fa';
import { getCourses, getSingleCourse } from '../services/user';


const SingleCoursePage = () => {
  const [course, setCourse] = useState(null)
  const { id } = useParams();
  const [courseId, setCourseId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setCourseId(id);
      console.log(id)

      const fetchData = async () => {
        setLoading(true);
        try {
          const courseData = await getSingleCourse(id);

          setCourse(courseData.coursesDto);

          // console.log(courseData)

        } catch (error) {
          console.error('Error fetching course data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }


  }, [id]);


  function addToCart(item) {
    // Check if cart already exists in localStorage
    let cart = localStorage.getItem('cart');

    // If cart doesn't exist, create an empty array
    if (!cart) {
      cart = [];
    } else {
      // Parse existing cart from JSON
      cart = JSON.parse(cart);
    }

    // Add item to cart
    cart.push(item);

    // Store updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  const addCart = () => {
    addToCart({ id: course.id, name: course.title, price: course.nairaPrice })

    location.reload()
  }


  return (
    <Layout>
      <div className='course-page'>
        <div className='course-banner'>
          <div className="breadcrumb">
            {course?.courseCategory} {'> '}
            {course?.courseGroup} {'> '}
            {course?.title}
          </div><br />
          <div className='top-section'>
            <div>
              <h1>
                {course?.title}
              </h1> <br />

              <p>{course?.description}</p><br />

              <p>
                5.0 <span style={{ color: 'gold' }}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> </span> 1,891,815 students
              </p><br />

              <p>Created by <b>{course?.author}</b></p>

              <br /><br />
            </div>

            <div className='course-image'>

              {course?.courseVideoUrl ? <video src={course?.courseVideoUrl} style={{ maxWidth: "100%" }}

                controls></video> : <img src={course?.courseImageUrl || courseImage} alt="" style={{ height: "300px", width: "100%" }} />}

            </div>
          </div>
        </div><br />

        <div className="sections">
          <div className="section1">
            <div className='sub-section1'>
              <h1>What you'll learn</h1><br />
              <div className="sub-points">
                {
                  course?.sectionDto?.map((section, index) => (
                    <div key={index}>
                      {section?.seriesList?.map((series, i) => (
                        <p key={i}>
                          {series.title}
                        </p>
                      ))
                      }
                    </div>
                  ))
                }
              </div>
            </div>

            <div className='sub-section2'>
              <h1>₦{course?.nairaPrice.toLocaleString()}</h1>

              <br /><br />
              <button className='btn1' onClick={addCart} >Add to cart</button>
              {/* <button className='btn2'>Buy Now</button> */}

              <p>30-Day Money-Back Guarantee</p>
            </div>
          </div>
        </div>


        <br /><br /><br />
      </div>
    </Layout>
  )
}

export default SingleCoursePage