import React, { useEffect, useState } from 'react';
import './styles.css';
import TutorLayout from '../../components/tutor/TutorLayout';
import { useParams } from 'react-router-dom';
import { getSingleCourse } from '../../services/user';
import { api_url, token } from '../../config/config';
import axios from 'axios';
import { toast } from "react-toastify";
import { getCoursecategories, getCourseGroups } from '../../services/tutor';

// Video upload progress UI component
const VideoUploadProgress = ({ videoUploadProgress }) => (
  videoUploadProgress > 0 && (
    <>
      <progress value={videoUploadProgress} max="100">
        {videoUploadProgress}%
      </progress>
      <br />
      {videoUploadProgress === 100 ? "Video upload successfully" : `${videoUploadProgress}%`}
    </>
  )
);

const AddSectionModal = ({ isOpen, onClose, onSave, newSectionTitle, setNewSectionTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="add-modal">
        <h3>Add New Section</h3>
        <label>Section Title:</label>
        <input
          type="text"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onSave}>Add Section</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// AddSeriesModal component
const AddSeriesModal = ({ isOpen, onClose, onSave, newSeriesTitle, setNewSeriesTitle, newResourceFile, setNewResourceFile, handleUploadVideo, videoUploadProgress }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="add-modal">
        <h3>Add New Series</h3>
        <label>Series Title:</label>
        <input
          type="text"
          value={newSeriesTitle}
          onChange={(e) => setNewSeriesTitle(e.target.value)}
        />
        <label>Resource File Link:</label>
        <input
          type="link"
          value={newResourceFile}
          onChange={(e) => setNewResourceFile(e.target.value)}
        />
        <label>Upload Video:</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleUploadVideo}
        />
        <VideoUploadProgress videoUploadProgress={videoUploadProgress} />


        <br /><br />
        <div className="modal-actions">
          <button onClick={onSave} disabled={videoUploadProgress > 0 && videoUploadProgress < 100}>Add Series</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const TutorEditCourse = () => {
  const [activeSlide, setActiveSlide] = useState('course');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const [course, setCourse] = useState(null);
  const { id } = useParams();

  const [courseGroups, setCourseGroups] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);


  const [loading, setLoading] = useState(false);

  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);


  // New series state
  const [isAddSeriesModalOpen, setIsAddSeriesModalOpen] = useState(false);
  const [newSeriesTitle, setNewSeriesTitle] = useState('');
  const [newResourceFile, setNewResourceFile] = useState('');
  const [newVideoFile, setNewVideoFile] = useState(null);

  const [video, setVideo] = useState(null);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [isVideoUploading, setIsVideoUploading] = useState(true);


  const handleUploadVideo = async (event, isEdit = false) => {
    const uploadedVideo = event.target.files[0];
    setVideoUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('files', uploadedVideo);
      formData.append('name', 'course series video');
      formData.append('type', 'video');

      const response = await axios.post(`${api_url}/images/add`, formData, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setVideoUploadProgress(percentCompleted);
        }
      });

      const videoLink = response.data.url;
      if (isEdit) {
      setSelectedSeries((prev) => ({ ...prev, videoLink }));
      } else {
        setNewVideoFile(videoLink);
      }
      toast.success("Video uploaded successfully");
      setVideoUploadProgress(0);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while uploading video, please try again.");
    }
  };

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
    const seriesWithOldTitle = { ...series, oldTitle: series?.title };
    setSelectedSeries(seriesWithOldTitle);

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


      // setTimeout(() => {
      //   window.location.href = "/tutor/courses"
      // }, 2000);

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
    if (selectedSeries.title == "") {
      return
    }
    const updatedSeriesList = selectedSection.seriesList.map((series) =>
      series.title === selectedSeries.oldTitle ? selectedSeries : series
    );
    const updatedSection = { ...selectedSection, seriesList: updatedSeriesList };
    console.log(selectedSeries, updatedSection)
    handleSaveSection(updatedSection); // Save the updated section with the edited series
    setSelectedSection(updatedSection);
    toast.success(`Series updated`);
    handleBackToSeries();
  };

  const handleCourseFieldChange = (field, value) => {
    setCourse({ ...course, [field]: value });
  };

  const handleSectionTitleChange = (sectionId, title) => {
    if (title == "") {
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

  const handleCourseCategoryChange = async (e) => {
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


  const handleDeleteSection = async (sectionIndex) => {
    const updatedSections = course.sectionDto.filter((_, index) => index !== sectionIndex);
    setCourse({ ...course, sectionDto: updatedSections });
    toast.success("Section deleted successfully");
  };


  // Function to delete a series from a section
  const handleDeleteSeries = (seriesTitle) => {
    const updatedSeriesList = selectedSection.seriesList.filter(series => series.title !== seriesTitle);
    const updatedSection = { ...selectedSection, seriesList: updatedSeriesList };
    handleSaveSection(updatedSection);
    setSelectedSection(updatedSection);
  };

  // Function to handle adding a new section
  const handleAddSection = () => {
    if (newSectionTitle.trim() === '') {
      toast.error('Section title cannot be empty');
      return;
    }

    const newSection = {
      id: Date.now(),
      title: newSectionTitle,
      seriesList: [],
    };

    setCourse({
      ...course,
      sectionDto: [...course.sectionDto, newSection],
    });

    // Clear the form after adding
    setNewSectionTitle('');
    setIsAddSectionModalOpen(false);
    toast.success('Section added successfully');
  };

  // Function to handle adding a new series
  const handleAddSeries = () => {
    if (newSeriesTitle.trim() === '' || !selectedSection) {
      toast.error('Series title and section must be selected');
      return;
    }

    const newSeries = {
      title: newSeriesTitle,
      resourceFile: newResourceFile,
      videoFile: newVideoFile,
    };

    const updatedSection = {
      ...selectedSection,
      seriesList: [...selectedSection.seriesList, newSeries],
    };

    handleSaveSection(updatedSection);
    setSelectedSection(updatedSection);

    // Clear the form after adding
    setNewSeriesTitle('');
    setNewResourceFile('');
    setNewVideoFile(null);
    setIsAddSeriesModalOpen(false);
    toast.success('Series added successfully');
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
              <div style={{ display: "flex", justifyContent: "space-between" }} >
                <h3>Sections</h3>         <button onClick={() => setIsAddSectionModalOpen(true)}>Add Section</button>
              </div>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course?.sectionDto?.map((section, index) => (
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
                        <td style={{ display: "flex" }}>
                          <button onClick={() => handleSectionClick(section)} style={{ height: "50px" }}>
                            Edit Series
                          </button>
                          <button onClick={() => handleDeleteSection(index)} style={{ height: "50px", marginLeft: '5px' }}>
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


              <button onClick={() => setIsAddSeriesModalOpen(true)}>Add New Series</button>
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
                        <td> <button style={{ margin: "0px", marginRight: "10px" }} onClick={() => handleSeriesClick(series)}>Edit</button>
                          <button style={{ margin: "0px" }} onClick={() => handleDeleteSeries(series.title)}>Delete</button></td>
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
            <div className="slide active">
              <h3>Edit Series</h3>
              <label>Series Title</label>
              <input
                type="text"
                value={selectedSeries.title}
                onChange={(e) =>
                  setSelectedSeries({ ...selectedSeries, title: e.target.value })
                }
              />
              <label>Series Resource Link</label>
              <input
                type="text"
                value={selectedSeries.resourceFile}
                onChange={(e) =>
                  setSelectedSeries({ ...selectedSeries, resourceFile: e.target.value })
                }
              />
              <label>Upload Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleUploadVideo(e, true)}
              />
              <VideoUploadProgress videoUploadProgress={videoUploadProgress} />
              <button onClick={handleBackToSeries}>Back</button>
              <button onClick={handleSaveSeries} disabled={!selectedSeries.title}>Save Series</button>
            </div>
          )}
        </div>


      </div>

      {/* Add Section Modal */}
      <AddSectionModal
        isOpen={isAddSectionModalOpen}
        onClose={() => setIsAddSectionModalOpen(false)}
        onSave={handleAddSection}
        newSectionTitle={newSectionTitle}
        setNewSectionTitle={setNewSectionTitle}
      />

      {/* Add Series Modal */}
      <AddSeriesModal
        isOpen={isAddSeriesModalOpen}
        onClose={() => setIsAddSeriesModalOpen(false)}
        onSave={handleAddSeries}
        newSeriesTitle={newSeriesTitle}
        setNewSeriesTitle={setNewSeriesTitle}
        newResourceFile={newResourceFile}
        setNewResourceFile={setNewResourceFile}
        handleUploadVideo={handleUploadVideo}
        videoUploadProgress={videoUploadProgress} 
      />
    </TutorLayout>
  );
};

export default TutorEditCourse;
