import React, { useState } from "react";
import "./styles.css";
import CourseDetails from "./CourseDetails";
import SectionForm from "./SectionForm";
import SeriesForm from "./SeriesForm";
import SectionsTable from "./SectionsTable";

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
      series: [],
    };
    setSections([...sections, newSection]);
  };

  const handleSelectSection = (section) => {
    setCurrentSection(section);
    setActiveSlide(3);
  };

  const handleAddSeries = (seriesData) => {
    setSections((prevSections) => {
      const updatedSections = prevSections.map((section) => {
        if (section.id === currentSection.id) {
          return { ...section, series: [...section.series, seriesData] };
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

  const handleSaveCourse = () => {
    const courseData = { ...course, sections };
    localStorage.setItem("courseData", JSON.stringify(courseData));
    alert("Course saved successfully!");
    location.href="/tutor/courses"
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
        />
      </div>
      <div className={activeSlide === 3 ? "slide active" : "slide"}>
        {currentSection && (
          <div>
            <h2>Course Title: {currentSection.title}</h2>
            <SeriesForm onAddSeries={handleAddSeries} /><br /><br />
            <h3>All Series</h3><br />
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Video</th>
                  <th>Resource</th>
                </tr>
              </thead>
              <tbody>
                {currentSection?.series?.map((series, index) => (
                  <tr key={index}>
                    <td>{series.title}</td>
                    <td>{series.video}</td>
                    <td>{series.resource}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div><br />
      <div>
        {activeSlide === 3 ? (
          <button onClick={() => setActiveSlide(2)}>Back to Sections</button>
        ) : (
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
