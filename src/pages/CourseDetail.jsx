import React, { useState } from 'react';
import Layout from '../components/home/Layout';

const CourseContent = () => {
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
<div>

<div>
    <h1>Course Details</h1><br /><br />
</div>
<div className="course-content">
      <div className="video-display">
    {selectedSeries && (
      <div>
        <h2>{selectedSeries.title}</h2>
        <video src={selectedSeries.videoUrl} controls style={{ height: '400px'}} />
      </div>
    )}
  </div>
  <div className="sections">
    {courseData.map((section, index) => (
      <div key={index} className="section">
        <h3 onClick={() => handleSectionClick(index)}>{section.sectionTitle}</h3>
        <div className={`series ${selectedSection === index ? 'active' : ''}`}>
          {section.series.map((series, seriesIndex) => (
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
</div>
</Layout>
  );
};

export default CourseContent;
