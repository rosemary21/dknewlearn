import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/home/Layout'
import defaultImg from "../../assets/default.png";
import { FaStar } from 'react-icons/fa';
import { getCourses, getSingleCourse } from '../../services/user';
import video from "../../assets/video.gif"

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

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };


    return (
        <Layout>
            <div className='course-page'  >
                {/* <div className='course-banner'>
                    <div className="breadcrumb">
                        {course?.courseCategory} {'> '}
                        {course?.courseGroup} {'> '}
                        {course?.title}
                    </div><br /><br />
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
                            {course?.courseVideoUrl ? <video src={course?.courseVideoUrl} style={{ maxWidth: "100%", maxHeight: "400px" }}

                                controls></video> : <img src={course?.courseImageUrl || defaultImg} alt="" style={{ height: "300px", width: "100%" }} />}
                        </div>
                    </div>
                </div><br /><br /><br /> */}



                <div className="view-course-content">
                    <div>
                        <div className="video-display" >
                            {selectedSeries ? (
                                <div>
                                    <h2 style={{ color: "white"}} >{selectedSeries.title}</h2><br />
                                    {/* <video src={selectedSeries.videoLink} controls style={{ height: '400px' }} /> */}

                                    <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
                                        <video
                                            ref={videoRef}
                                            width="100%"
                                            style={{ display: 'block', height: '400px' }}
                                            onClick={handlePlayPause}
                                            src={selectedSeries.videoLink}
                                            controls
                                        />
                                        {!isPlaying && (
                                            <button
                                                onClick={handlePlayPause}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    color: 'white',
                                                    fontSize: '24px',
                                                    padding: '20px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                ▶️
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div >
                                    <center><img src={video} alt="" className="" /></center>
                                </div>
                            )}



                        </div>


                        <div style={{ padding: "20px" }}>
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

                                </div>

                            </div>

                        </div>

                        <br />
                    </div>
                    <div className="course-aside">
                        <h2 style={{ padding: "10px" }}>Course content</h2>

                        {course?.sectionDto?.map((section, index) => (
                            <div key={index} className="section">
                                <h3 onClick={() => handleSectionClick(index)}>{index + 1}{")"} {section.title}</h3>
                                <div className={`series active`}>
                                    {section?.seriesList?.map((series, seriesIndex) => (
                                        <div
                                            key={seriesIndex}
                                            className="series-title"
                                            onClick={() => handleSeriesClick(series)}
                                        >
                                            {index + 1}{"."}{seriesIndex + 1}{") "}{series.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <br />




                <br /><br /><br />
            </div>
        </Layout>
    )
}

export default ViewCourse