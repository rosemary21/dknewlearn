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

// const StepTwo = ({
//   formData,
//   setFormData,
//   onNext,
//   onPrevious,
// }) => {
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (event) => {
//     const profiles = event.target.files[0];


//     // Do something with the file, for example, update state or perform other operations
//     // You might want to use FileReader to read the contents of the file

//     setFormData({ ...formData, profile: profiles });
//   };

//   const isValid =
//     formData.profile &&
//     formData.bio &&
//     formData.bio.trim() !== "" &&
//     formData.gender &&
//     formData.gender.trim() !== "" &&
//     formData.location &&
//     formData.location.trim() !== "";

//   return (
//     <div className="step-container">
//       <h2>Profile Information</h2>

//       <label>Profile Image:</label>
//       <img src={formData.profile || ""} alt="" />
//       <input type="file" name="profile" onChange={handleFileChange} />

//       <label>Bio:</label>
//       <textarea
//         name="bio"
//         value={formData.bio || ""}
//         onChange={handleInputChange}
//       ></textarea>

//       <label>Role:</label>

//       <select
//         name="role"
//         id="role"
//         value={formData.role || ""}
//         onChange={handleInputChange}
//       >
//         <option value="">Select</option>
//         <option value="Frontend Developer">Frontend Developer</option>
//         <option value="Backend Develope">Backend Developer</option>
//         <option value="Fullstack Developer">Fullstack Developer</option>
//         <option value="Web3 Developer">Web3 Developer</option>
//         <option value="Product Designer">Product Designer</option>
//         <option value="Product/Project Manager">Product/Project Manager</option>
//         <option value="Graphics Designer">Graphics Designer</option>
//         <option value="Technical Writer">Technical Writer</option>
//         <option value="Data Scientist/Analyst">Data Scientist/Analyst</option>
//         <option value="DevOps Engineer">DevOps Engineer</option>
//       </select>

//       <label>Gender:</label>

//       <select
//         name="gender"
//         id="gender"
//         value={formData.gender || ""}
//         onChange={handleInputChange}
//       >
//         <option value="">Select</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select>

//       <label>Location:</label>
//       <input
//         type="text"
//         name="location"
//         value={formData.location || ""}
//         onChange={handleInputChange}
//       />
//       <div>
//         <button onClick={onPrevious}>Previous</button>
//         <button onClick={isValid ? onNext : null} disabled={!isValid}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// const StepThree = ({ formData, setFormData, onNext, onPrevious }) => {
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const isValid = formData.portfolio && formData.portfolio.trim() !== "";

//   return (
//     <div className="step-container">
//       <h2>Social Media Handles</h2>
//       <label>Portfolio:</label>
//       <input
//         type="text"
//         name="portfolio"
//         value={formData.portfolio || ""}
//         onChange={handleInputChange}
//       />
//       <label>Github:</label>
//       <input
//         type="text"
//         name="github"
//         value={formData.github || ""}
//         onChange={handleInputChange}
//       />
//       <label>Instagram:</label>
//       <input
//         type="text"
//         name="instagram"
//         value={formData.instagram || ""}
//         onChange={handleInputChange}
//       />
//       <label>Twitter:</label>
//       <input
//         type="text"
//         name="twitter"
//         value={formData.twitter || ""}
//         onChange={handleInputChange}
//       />

//       <div>
//         <button onClick={onPrevious}>Previous</button>
//         <button onClick={isValid ? onNext : null} disabled={!isValid}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

const StepFour = ({
  formData,
  setFormData,
  onPrevious,
  termsChecked,
  onSubmit,
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValid =
    formData.password &&
    formData.password.trim() !== "" &&
    formData.password == confirmPassword &&
    termsChecked;

  return (
    <div className="step-container">
      <h2>Course Details</h2>
      <label>Course Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title || ""}
        onChange={handleInputChange}
      />
      <label>Section Title:</label>
      <input
        type="text"
        name="section_title"
        value={formData.section_title || ""}
        onChange={handleInputChange}
      />
<h2>Section Series</h2>
<label>Series Title:</label>
      <input
        type="text"
        name="series_title"
        value={formData.series_title || ""}
        onChange={handleInputChange}
      />

<label>Section Video:</label>
      <input
        type="file"
        name="scetion_title"
        value={formData.scetion_title || ""}
        onChange={handleInputChange}
      />
     

      <div>
        <button onClick={onPrevious}>Previous</button>
        <button onClick={isValid ? onSubmit : null} disabled={!isValid}>
          Submit
        </button>
      </div>
    </div>
  );
};

const TutorCreateCourses = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);


  const handleNext = () => {
    setStep(step + 3);
  };

  const handlePrevious = () => {
    setStep(step - 3);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    // Assuming there's an API endpoint for form submissions
    const apiUrl = `/auth/user-register`;

    // Create a new FormData object and append each field from the form data
    const formDataObject = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObject.append(key, value);
    });

    // Make a POST request to the API with FormData
    fetch(apiUrl, {
      method: "POST",
      body: formDataObject,
    })
      .then((response) => {
        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
          setLoading(false);
          console.error("Form submission failed:");
          toast.error("Registration Not Successful", {
            position: "top-right",
            autoClose: 5000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);

        console.log("Form submitted successfully:", data);

        if(data.error == 'This email has already been registered'){
          toast.error(data.error, {
            position: "top-right",
            autoClose: 5000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return 
        }

        if(data.error == 'Internal server error'){
          toast.error('Oops! Something went wrong. Try Again', {
            position: "top-right",
            autoClose: 5000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return 
        }


        
        toast.success("Registration Successful.", {
          position: "top-right",
          autoClose: 3000, // milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.success("Check Your Mail For Confirmation Email.", {
          position: "top-right",
          autoClose: 3000, // milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        location.href = '/login'
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "An error occurred during form submission:",
          error.message
        );
        toast.error("Oops! Something went wrong. Try Again", {
          position: "top-right",
          autoClose: 5000, // milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <TutorLayout>
        <h1>Create Course</h1>
    <div className="form_container auth-container">
      <div className="form-container">
        {/* <ProgressBar step={step} />
        {step === 0 && (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        )} */}
        {/* {step === 1 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {step === 2 && (
          <StepThree
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )} */}
        {/* {step === 3 && (
          <StepFour
            formData={formData}
            setFormData={setFormData}
            onPrevious={handlePrevious}
            onSubmit={() => handleSubmit(formData)}
          />
        )}*/}

<Courses />
      </div>
      {/* {loading && (
        <div class="loading-container">
          <div class="loading-spinner">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
          </div>
        </div>
      )}  */}


      <ToastContainer />
    </div>
     </TutorLayout>
  );
};

export default TutorCreateCourses;
