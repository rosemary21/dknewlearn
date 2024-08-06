import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/home/Layout'
import courseImage from "../../assets/course-img1.png";
import { FaStar } from 'react-icons/fa';
import { getCourses, getSingleCourse } from '../../services/user';


const ViewCourse = () => {
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


    const [selectedSeries, setSelectedSeries] = useState(null);

    const handleSeriesClick = (series) => {
        setSelectedSeries(series);
    };
    const [selectedSection, setSelectedSection] = useState(null);

    const handleSectionClick = (index) => {
        setSelectedSection(selectedSection === index ? null : index);
    };

    const courseData = [
        {
            sectionTitle: 'Section 1',
            series: [
                { title: 'Series 1.1', videoUrl: '/video1.mp4' },
                { title: 'Series 1.2', videoUrl: '/video2.mp4' },
            ],
        },
        {
            sectionTitle: 'Section 2',
            series: [
                { title: 'Series 2.1', videoUrl: '/video1.mp4' },
                { title: 'Series 2.2', videoUrl: '/video2.mp4' },
            ],
        },
    ];


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
                                5.0 <span style={{ color: 'gold' }}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> </span>
                            </p><br />

                            <p>Created by <b>{course?.author}</b></p>

                            <br /><br />
                        </div>

                        <div className='course-image'>
                            <img src={courseImage} alt="" />
                        </div>
                    </div>
                </div><br /><br /><br />

              

                <div className="course-content">
                    <div className="video-display">
                        {selectedSeries && (
                            <div>
                                <h2>{selectedSeries.title}</h2>
                                <video src={selectedSeries.videoLink} controls style={{ height: '400px' }} />
                            </div>
                        )}
                    </div>
                    <div className="sections">
                        {course?.sectionDto?.map((section, index) => (
                            <div key={index} className="section">
                                <h3 onClick={() => handleSectionClick(index)}>{section.title}</h3>
                                <div className={`series ${selectedSection === index ? 'active' : ''}`}>
                                    {section?.seriesList?.map((series, seriesIndex) => (
                                        <div
                                            key={seriesIndex}
                                            className="series-title"
                                            onClick={() => handleSeriesClick(series)}
                                        >
                                            {series.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            <br />

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

                    </div>
                </div>



                <br /><br /><br />
            </div>
        </Layout>
    )
}

export default ViewCourse