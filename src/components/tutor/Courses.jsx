import React, { useEffect, useState } from "react";
import "./styles.css";
import CourseDetails from "./CourseDetails";
import SectionForm from "./SectionForm";
import SeriesForm from "./SeriesForm";
import SectionsTable from "./SectionsTable";
import { api_url, token } from "../../config/config";
import { toast } from "react-toastify";
import axios from "axios";
import { getCourseGroups } from "../../services/tutor";
import { FaTrash } from "react-icons/fa";

function Courses() {
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [activeSlide, setActiveSlide] = useState(1);

  const handleCourseDetailsNext = (courseData) => {
    setCourse(courseData);
    setActiveSlide(2);
  };

  const handleAddSection = (sectionTitle) => {
    const newSection = {
      id: sections.length + 1,
      title: sectionTitle,
      seriesList: [], // Updated to match the key used in handleAddSeries
    };
    setSections([...sections, newSection]);
  };

  const handleSelectSection = (section) => {
    setCurrentSection(section);
    setActiveSlide(3);
  };

  const handleAddSeries = (seriesData) => {

    const newSeries = {
      ...seriesData,
      id: currentSection.seriesList.length + 1, // Assign a unique ID
    };

    setSections((prevSections) => {
      const updatedSections = prevSections.map((section) => {
        if (section.id === currentSection.id) {
          return { ...section, seriesList: [...section.seriesList, newSeries] };
        }
        return section;
      });
      setCurrentSection(null); // Reset currentSection
      setTimeout(
        () =>
          setCurrentSection(
            updatedSections.find((s) => s.id === currentSection.id)
          ),
        0
      ); // Set currentSection to updated one
      return updatedSections;
    });
  };

  const handleSaveCourse = async () => {
    const courseData = { ...course, sectionDto: sections };

    localStorage.setItem("courseData", JSON.stringify(courseData));

if(sections.length == 0){
  toast.error("You must add one section with series to the course");
  return
}

for (let i = 0; i < sections.length; i++) {
  if (!sections[i].seriesList || sections[i].seriesList.length < 1) {
    toast.error(`Section ${i + 1} must contain at least one series`);
    return;
  }
}



    try {
      const response = await axios.post(`${api_url}/course/tutoraddcourses`, courseData, {
        headers: {
          'apiKey': `${token}`,
        }
      });

      console.log(response);
      toast.success("Course created successfully");
      localStorage.removeItem("courseData");

      // setTimeout(() => {
      //   location.href = "/tutor/courses";
      // }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the course");
    }
  };

  const handleDeleteSection = (sectionId) => {
    // Filter out the section with the provided id
    setSections(sections.filter((section) => section.id !== sectionId));
  };


  const handleDeleteSeries = (seriesId) => {

    // Update the current section's seriesList by filtering out the deleted series
    setSections((prevSections) => {
      return prevSections.map((section) => {
        if (section.id === currentSection.id) {
          return {
            ...section,
            seriesList: section.seriesList.filter(series => series.id !== seriesId),
          };
        }
        return section;
      });
    });

    // Update currentSection's seriesList to reflect the deletion
    setCurrentSection((prev) => ({
      ...prev,
      seriesList: prev.seriesList.filter((series) => series.id !== seriesId),
    }));
  };


  return (
    <div className="container">
      <div className={activeSlide === 1 ? "slide active" : "slide"}>
        <CourseDetails onNext={handleCourseDetailsNext} />
      </div>
      <div className={activeSlide === 2 ? "slide active" : "slide"}>
        <SectionForm onAddSection={handleAddSection} /><br />
        <SectionsTable
          sections={sections}
          onSelectSection={handleSelectSection}
          onDeleteSection={handleDeleteSection}
        />
      </div>
      <div className={activeSlide === 3 ? "slide active" : "slide"}>
        {currentSection && (
          <div>
            <h2>Section Title: {currentSection.title}</h2>
            <SeriesForm onAddSeries={handleAddSeries} /><br /><br />
            <h3>All Series</h3><br />
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Video</th>
                  <th>Resource</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentSection?.seriesList?.map((series, index) => (
                  <tr key={index}>
                    <td>{series.title}</td>
                    <td style={{
                      maxWidth: '150px',      // Set maximum width
                      overflow: 'hidden',      // Hide overflow
                      textOverflow: 'ellipsis', // Add ellipsis for overflow text
                      whiteSpace: 'nowrap'     // Prevent line wrapping
                    }}>{series.videoLink}</td>
                    <td>{series.resourceFile}</td>
                    <td>     <button
                      className="delete-btn"
                      onClick={() => handleDeleteSeries(series.id)}
                      style={{
                        margin: 0,
                        width: "40px"
                      }}
                    >
                      <FaTrash />
                    </button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div><br />


      <div>
        {activeSlide === 3 && (
          <button onClick={() => setActiveSlide(2)}>Back to Sections</button>
        )}

        {activeSlide === 2 && (
          <>
            <button
              style={{ marginTop: "40px", background: "green" }}
              onClick={handleSaveCourse}
            >
              Save Course
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Courses;
