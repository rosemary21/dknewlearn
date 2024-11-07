import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/home/Layout'
import courseImage from "../assets/course-img1.png";
import { FaStar } from 'react-icons/fa';
import { getCourses, getSingleCourse, getUser } from '../services/user';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';
import useAuth from '../services/auth';
import { isTokenExpired } from '../utils/auth';


const SingleCoursePage = () => {
  const [course, setCourse] = useState(null)
  const { id } = useParams();
  const [courseId, setCourseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate()

  const { addToCart } = useContext(CartContext);


  const expired = isTokenExpired();

// Check if token is expired and if the user is not already on the login page
if (expired && window.location.pathname !== "/login") {
  console.log("Token has expired.");
  
  localStorage.clear();
  window.location.href = "/login";
} else {
  console.log("Token is still valid.");
  // Proceed with authenticated actions
}

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();


        console.log(userData.courses)

        setCourses(userData.courses);


      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  // function addToCart(item) {
  //   // Check if cart already exists in localStorage
  //   let cart = localStorage.getItem('cart');

  //   // If cart doesn't exist, create an empty array
  //   if (!cart) {
  //     cart = [];
  //   } else {
  //     // Parse existing cart from JSON
  //     cart = JSON.parse(cart);
  //   }

  //   // Check if item already exists in the cart
  //   const itemExists = cart.some(cartItem => cartItem.id === item.id); // Assuming items have a unique 'id'

  //   if (itemExists) {
  //     // Show a toast notification for existing item
  //     toast.warning("This item is already in your cart!")
  //   } else {
  //     // Add item to cart
  //     cart.push(item);

  //     // Store updated cart back to localStorage
  //     localStorage.setItem('cart', JSON.stringify(cart));


  //     toast.success("Item added to cart successfully!")


  //     localStorage.setItem("refresh", true)

  //   // location.reload()
  //   }
  // }

  const auth = useAuth()

  const addCart = () => {

    if (auth.isAuth == false) {
      toast.warn("You need to login")


      setTimeout(() => {
        location.href = "/login";
      }, 2000)
    } else {


      console.log(courses)


      const existsInCourses = courses.some(item => item.id === course.id,);

      if (existsInCourses) {
        toast.warn("You have already purchased this course, you can't add it to cart again")

        navigate(`/view-course/${id}`)
      } else {

        addToCart({ id: course.id, name: course.title, price: course.nairaPrice })
      }


    }


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

            </div>
          </div>
        </div>


        <br /><br /><br />
      </div>
    </Layout>
  )
}

export default SingleCoursePage