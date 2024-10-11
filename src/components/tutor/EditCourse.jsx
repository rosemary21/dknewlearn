import React, { useState } from 'react';
import './styles.css'; // Import the CSS file for styling

const EditCourse = () => {
  const [activeSlide, setActiveSlide] = useState('course');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setSelectedSeries(null);
    setActiveSlide('series');
  };

  const handleSeriesClick = (series) => {
    setSelectedSeries(series);
    setActiveSlide('editSeries');
  };

  const handleBackToSeries = () => {
    setActiveSlide('series');
  };

  
  const handleBackToSections = () => {
    setActiveSlide('sections');
  };

  const handleBackToCourse = () => {
    setActiveSlide('course');
  };

  const handleSaveSeries = () => {
    // Save edited series data to local storage
    // For example, you can use localStorage.setItem()
    alert(`Saving series: ${selectedSeries.title}`);
  };

  const handleSaveCourse = () => {
    // Save edited series data to local storage
    // For example, you can use localStorage.setItem()
    alert(`Saving  course`);
  };


  // const course = {
  //   "group": "ty3553",
  //   "category": "6565645",
  //   "title": "464564565",
  //   "price": "54645746",
  //   "sections": [
  //       {
  //           "id": 1,
  //           "title": "47467",
  //           "series": [
  //               {
  //                   "title": "56457",
  //                   "video": "4574",
  //                   "resource": "C:\\fakepath\\IMG-20240409-WA0097.jpg"
  //               },
  //               {
  //                   "title": "54457",
  //                   "video": "454",
  //                   "resource": "C:\\fakepath\\IMG-20240409-WA0097.jpg"
  //               }
  //           ]
  //       },
  //       {
  //           "id": 2,
  //           "title": "44744",
  //           "series": [
  //               {
  //                   "title": "4577",
  //                   "video": "47474",
  //                   "resource": "C:\\fakepath\\IMG-20240409-WA0097.jpg"
  //               }
  //           ]
  //       }
  //   ]
  // };

  return (
    <div className="">
      {/* Course Details Slide */}
      {activeSlide === 'course' && (
        <div className="slide active">
          <h2>Course Details</h2>
          <div>
          <label htmlFor="">Title</label>
            <input type="text" value={course.title} />
            <label htmlFor="">Course Group</label>
            <input type="text" value={course.group} />
            <label htmlFor="">Course Category</label>
            <input type="text" value={course.category} />
            <label htmlFor="">Price</label>
            <input type="text" value={course.price} />
          </div>
          <button onClick={() => setActiveSlide('sections')}>Next</button><button onClick={handleSaveCourse}>Save</button>
        </div>
      )}

      {/* Sections Slide */}
      {activeSlide === 'sections' && (
        <div className="slide active">
          <h3>Sections</h3>
          <div className="table-container">
            <table className='table'>
              <thead>
                <tr>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {course.sections.map((section) => (
                  <tr key={section.id} onClick={() => handleSectionClick(section)}>
                    <td>{section.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleBackToCourse}>Back</button><button onClick={handleSaveCourse}>Save</button>
          </div>
        </div>
      )}

      {/* Series Slide */}
      {activeSlide === 'series' && selectedSection && (
        <div className="slide active">
          <h3>Series in {selectedSection.title}</h3>
          <div className="table-container">
            <table className='table'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Video</th>
                </tr>
              </thead>
              <tbody>
                {selectedSection.series.map((series) => (
                  <tr key={series.title} onClick={() => handleSeriesClick(series)}>
                    <td>{series.title}</td>
                    <td>{series.video}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleBackToSections}>Back</button>    <button onClick={handleSaveCourse}>Save</button>
          </div>
        </div>
      )}

      {/* Edit Series Slide */}
      {activeSlide === 'editSeries' && selectedSeries && (
        <div className="slide active">
          <h3>Edit Series</h3>
          <input
            type="text"
            value={selectedSeries.title}
            onChange={(e) => setSelectedSeries({ ...selectedSeries, title: e.target.value })}
          />
          <button onClick={handleBackToSeries}>Back</button>
          <button onClick={handleSaveSeries}>Save</button>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
