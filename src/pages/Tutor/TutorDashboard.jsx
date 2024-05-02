import React from "react";
import TutorLayout from "../../components/tutor/TutorLayout";
import Courses from "../../components/tutor/Courses";
import profileImg from "../../assets/profile1.webp";
import { Link } from "react-router-dom";

const TutorDashboard = () => {
  return (
    <TutorLayout>
      <div className="tutor-courses">
        <div className="dashboard">
          <div className="top-banner">
            <div className="profile">
              <img
                src={profileImg}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                }}
              />
              <p>Welcome, David Mark</p>
            </div>
          </div>
        </div>
        <div className='top-banner panel'>
            <span>Jump Into Course Creation</span>
            <Link to={'/tutor/create-courses'}><button className='primary-btn'>Create Your course</button></Link> 
        </div>
      </div>
    </TutorLayout>
  );
};

export default TutorDashboard;
