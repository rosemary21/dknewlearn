import React, { useState } from "react";
import TutorLayout from '../../components/tutor/TutorLayout'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { api_url } from "../config/config";
import { Link } from "react-router-dom";
import Courses from "../../components/tutor/Courses";

const ProgressBar = ({ step }) => {
  const progressBarStyle = {
    width: `${(step / 3) * 100}%`,
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={progressBarStyle}>
        {step * 33}%
      </div>
    </div>
  );
};
const StepOne = ({ formData, setFormData, onNext }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };



  const isValid =
    formData.group &&
    formData.group.trim() !== "" &&
    formData.category &&
    formData.category.trim() !== ""


  return (
    <div className="step-container">
      <h2>Course Information</h2>
      <label>Course Group:</label>
      <input
        type="text"
        name="group"
        value={formData.group || ""}
        onChange={handleInputChange}
      />
      <label>Course Category:</label>
      <input
        type="text"
        name="category"
        value={formData.category || ""}
        onChange={handleInputChange}
      />
      <button onClick={isValid ? onNext : null} disabled={!isValid}>
        Next
      </button><br /><br />

    </div>
  );
};

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
