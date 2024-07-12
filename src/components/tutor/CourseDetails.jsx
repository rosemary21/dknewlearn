// src/components/CourseDetails.js
import React, { useState } from 'react';
import { api_url, token } from '../../config/config';
import axios from 'axios';
import { toast } from 'react-toastify';

const CourseDetails = ({ onNext }) => {
  const [course, setCourse] = useState({
    courseGroup: '',
    courseCategory: '',
    title: '',
    description: '',
    nairaPrice: ''
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };


  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleUploadImage = async (event) => {
    const uploadedImage = event.target.files[0];
    setImage(uploadedImage);

    try {
      const formData = new FormData();
      formData.append('files', uploadedImage);
      formData.append('name', 'course image');
      formData.append('type', 'image');



      const response = await axios.post(`${api_url}/images/add`, formData, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });


      setCourse({ ...course, ["courseImageUrl"]: response.data.url });
  
    } catch (error) {
      
      console.log(error)
        toast.error("An error occurred while uploading image, please try again.");
    } 


  };


  const handleUploadVideo = async (event) => {
    const uploadedVideo = event.target.files[0];
    setVideo(uploadedVideo);

    try {
      const formData = new FormData();
      formData.append('files', uploadedVideo);
      formData.append('name', 'course video');
      formData.append('type', 'video');



      const response = await axios.post(`${api_url}/images/add`, formData, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });


      setCourse({ ...course, ["courseVideoUrl"]: response.data.url });
  
    } catch (error) {
      
      console.log(error)
        toast.error("An error occurred while uploading video, please try again.");
    } 


  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(course);
  };

  return (
    <div>
      <h2>Course Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Group:
          <input type="text" name="courseGroup" value={course.courseGroup} onChange={handleChange} />
        </label>
        <label>
          Course Category:
          <input type="text" name="courseCategory" value={course.courseCategory} onChange={handleChange} />
        </label>
        <label>
          Course Title:
          <input type="text" name="title" value={course.title} onChange={handleChange} />
        </label>
        <label>
          Course Description:
          <input type="text" name="description" value={course.description} onChange={handleChange} />
        </label>
        <label>
          Course Price:
          <input type="number" name="nairaPrice" value={course.nairaPrice} onChange={handleChange} />
        </label>

        <label>
        Course Image:
        <input
          type="file"
          accept="image/*"
          name="courseImageUrl"
          onChange={handleUploadImage}
        />
      </label>
      {image && <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}

        <label>
          Course Video:
          <input type="file" accept="video/*" name="courseVideoUrl" onChange={handleUploadVideo} />
        </label>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default CourseDetails;
