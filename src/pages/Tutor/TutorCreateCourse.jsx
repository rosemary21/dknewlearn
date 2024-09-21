import React, { useState } from "react";
import TutorLayout from '../../components/tutor/TutorLayout'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Courses from "../../components/tutor/Courses";

const TutorCreateCourses = () => {

  return (
    <TutorLayout>
      <h1>Create Course</h1><br />
      <div className="form_container auth-container">
        <div className="form-container">


          <Courses />
        </div>


        <ToastContainer />
      </div>
    </TutorLayout>
  );
};

export default TutorCreateCourses;
