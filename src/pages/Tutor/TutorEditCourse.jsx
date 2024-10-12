import React, { useEffect, useState } from 'react';
import './styles.css'; 
import TutorLayout from '../../components/tutor/TutorLayout';
import { useParams } from 'react-router-dom';
import { getSingleCourse } from '../../services/user';
import { api_url, token } from '../../config/config';
import axios from 'axios';
import { toast } from "react-toastify";
import { getCoursecategories, getCourseGroups } from '../../services/tutor';

const TutorEditCourse = () => {
  const [activeSlide, setActiveSlide] = useState('course');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const [course, setCourse] = useState(null);
  const { id } = useParams();

  const [courseGroups, setCourseGroups] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const courseData = await getSingleCourse(id);
          setCourse(courseData.coursesDto);


        const fetchCourseCategories = async () => {

          
          if (courseData.coursesDto?.courseGroup) {
        
            const data = await getCoursecategories(courseData.coursesDto?.courseGroup)
            setCourseCategories(data?.courseCategories);
          } else {
            setCourseCategories([]); // Reset subcategories if no category is selected
          }
        }

        fetchCourseCategories()
        } catch (error) {
          console.error('Error fetching course data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setSelectedSeries(null);
    setActiveSlide('series');
  };

  const handleSeriesClick = (series) => {
    setSelectedSeries(series);
    setActiveSlide('editSeries');
  };

  const handleBackToSeries = () => setActiveSlide('series');
  const handleBackToSections = () => setActiveSlide('sections');
  const handleBackToCourse = () => setActiveSlide('course');

  const handleSaveCourse = async () => {
    

    try {
      const response = await axios.post(`${api_url}/course/update`, course, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'application/json'
        }
      }
      );

    toast.success("Course updated successfully")


    setTimeout(() => {
      window.location.href = "/tutor/courses"
    }, 2000);
  
    } catch (error) {
      console.log("An error occurred. Please try again.");
    }
  };

  const handleSaveSection = (updatedSection) => {
    const updatedSections = course.sectionDto.map((section) =>
      section.id === updatedSection.id ? updatedSection : section
    );
    setCourse({ ...course, sectionDto: updatedSections });
  };

  const handleSaveSeries = () => {
    if(selectedSeries.title == ""){
      return
    }
    const updatedSeriesList = selectedSection.seriesList.map((series) =>
      series.title === selectedSeries.title ? selectedSeries : series
    );
    const updatedSection = { ...selectedSection, seriesList: updatedSeriesList };
    console.log(updatedSection)
    handleSaveSection(updatedSection); // Save the updated section with the edited series
    setSelectedSection(updatedSection); 
    toast.success(`Series updated`);
    handleBackToSeries();
  };

  const handleCourseFieldChange = (field, value) => {
    setCourse({ ...course, [field]: value });
  };

  const handleSectionTitleChange = (sectionId, title) => {
    if(title == ""){
      return
    }
    const updatedSections = course.sectionDto.map((section) =>
      section.id === sectionId ? { ...section, title } : section
    );
    setCourse({ ...course, sectionDto: updatedSections });
  };

  useEffect(() => {

    const fetchCourseGroups = async () => {
      const data = await getCourseGroups()

      setCourseGroups(data.courseGroups)
    }

    fetchCourseGroups()

 

  }, [])

  const handleCourseCategoryChange  = async (e) => {
    course.courseCategory = e.target.value
  }

  const handleCourseGroupChange = async (e) => {
    const selectedValue = e.target.value;


   
    course.courseGroup = selectedValue


    if (course.courseGroup) {
     
      const data = await getCoursecategories(course.courseGroup)
      setCourseCategories(data.courseCategories);
    } else {
      setCourseCategories([]); // Reset subcategories if no category is selected
    }
  }


  const handleDeleteSection = async (sectionId) => {
    const updatedSections = course.sectionDto.filter(section => section.id !== sectionId);
    setCourse({ ...course, sectionDto: updatedSections });
    toast.success("Section deleted successfully");
  };

    // Function to delete a series from a section
    const handleDeleteSeries = (seriesTitle) => {
      const updatedSeriesList = selectedSection.seriesList.filter(series => series.title !== seriesTitle);
      const updatedSection = { ...selectedSection, seriesList: updatedSeriesList };
      handleSaveSection(updatedSection);
      setSelectedSection(updatedSection); 

      console.log(updatedSection)
    };

  return (
    <TutorLayout>
      <div className="form_container auth-container">
        <div className="form-container">
          {/* Course Details Slide */}
          {activeSlide === 'course' && (
            <div className="slide active">
              <h2>Course Details</h2>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={course?.title || ''}
                  onChange={(e) => handleCourseFieldChange('title', e.target.value)}
                />
                <label>Course Category</label>
                <input 
                  type="text"
                  value={course?.courseCategory || ''}
                  onChange={(e) => handleCourseFieldChange('courseCategory', e.target.value)}
                />

<label htmlFor="categorySelect">Course Group:</label>
      <select id="categorySelect" value={course?.courseGroup} onChange={handleCourseGroupChange}>
        <option value="">Select a category</option>
        {courseGroups?.map((group) => (
          <option key={group.id} value={group?.code}>
            {group.description}
          </option>
        ))}
      </select>

      <br />

      <label htmlFor="subcategorySelect">Course Category:</label>
      <select id="subcategorySelect" value={course?.courseCategory} onChange={handleCourseCategoryChange} disabled={!course?.courseGroup}>
        <option value="">Select a subcategory</option>
        {courseCategories?.map((category) => (
          <option key={category.id} value={category.code}>
            {category.description}
          </option>
        ))}
      </select>


                <label>Price</label>
                <input
                  type="text"
                  value={course?.nairaPrice || ''}
                  onChange={(e) => handleCourseFieldChange('nairaPrice', e.target.value)}
                />
              </div>
              <button onClick={() => setActiveSlide('sections')}>Next</button>
              {/* <button onClick={handleSaveCourse}>Save Course</button> */}
            </div>
          )}

          {/* Sections Slide */}
          {activeSlide === 'sections' && (
            <div className="slide active"><br /><br />
              <h3>Sections</h3><br />
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course?.sectionDto?.map((section) => (
                      <tr key={section.id}>
                        <td>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) =>
                              handleSectionTitleChange(section.id, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <button onClick={() => handleSectionClick(section)} style={{ height: "50px"}}>
                            Edit Series
                          </button>
                          <button onClick={() => handleDeleteSection(section.id)} style={{ height: "50px", marginLeft: '5px' }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={handleBackToCourse}>Back</button>
                <button onClick={handleSaveCourse}>Save Courses</button>
              </div>
            </div>
          )}

          {/* Series Slide */}
          {activeSlide === 'series' && selectedSection && (
            <div className="slide active"><br />
              <h3>Series in {selectedSection.title}</h3><br />
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Video</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSection?.seriesList?.map((series) => (
                      <tr key={series?.title}>
                        <td>{series?.title}</td>
                        <td style={{ maxWidth: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
  {series?.videoLink}
</td>
                        <td> <button style={{ margin: "0px", marginRight: "10px"}} onClick={() => handleSeriesClick(series)}>Edit</button>
                        <button style={{ margin: "0px"}} onClick={() => handleDeleteSeries(series.title)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={handleBackToSections}>Back</button>
                <button onClick={handleSaveCourse}>Save Series</button>
              </div>
            </div>
          )}

          {/* Edit Series Slide */}
          {activeSlide === 'editSeries' && selectedSeries && (
            <div className="slide active"><br /><br />
              <h3>Edit Series</h3><br />

              <label htmlFor="">Series Title</label>
              <input
                type="text"
                value={selectedSeries.title}
                onChange={(e) =>
                  setSelectedSeries({ ...selectedSeries, title: e.target.value })
                }
              />

              <label htmlFor="">Series Resource Link</label>
              <input
                type="text"
                value={selectedSeries.resourceFile}
                onChange={(e) =>
                  setSelectedSeries({ ...selectedSeries, resourceFile: e.target.value })
                }
              />

              <label htmlFor="">Upload Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
              <br /><br />
              <button onClick={handleBackToSeries}>Back</button>
              <button onClick={handleSaveSeries}>Save Series</button>
            </div>
          )}
        </div>
      </div>
    </TutorLayout>
  );
};

export default TutorEditCourse;
