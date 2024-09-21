import React, { useEffect, useState } from 'react';
import './styles.css'; 
import TutorLayout from '../../components/tutor/TutorLayout';
import { useParams } from 'react-router-dom';
import { getSingleCourse } from '../../services/user';
import { api_url, token } from '../../config/config';
import axios from 'axios';
import { toast } from "react-toastify";

const TutorEditCourse = () => {
  const [activeSlide, setActiveSlide] = useState('course');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const courseData = await getSingleCourse(id);
          setCourse(courseData.coursesDto);
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
    handleSaveSection(updatedSection); // Save the updated section with the edited series
    alert(`Series updated: ${selectedSeries.title}`);
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
                      <th>Videof</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSection?.seriesList?.map((series) => (
                      <tr key={series?.title} onClick={() => handleSeriesClick(series)}>
                        <td>{series?.title}</td>
                        <td style={{ maxWidth: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
  {series?.videoLink}
</td>
                        <td><button>Edit</button></td>
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

              <label htmlFor="">Series title</label>
              <input
                type="text"
                value={selectedSeries.title}
                onChange={(e) =>
                  setSelectedSeries({ ...selectedSeries, title: e.target.value })
                }
              />

<label htmlFor="">Series resource link</label>
              <input
                type="text"
                value={selectedSeries.resourceFile}
                onChange={(e) =>
                  setSelectedSeries({ ...selectedSeries, resourceFile: e.target.value })
                }
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
