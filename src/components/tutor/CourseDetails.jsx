import React, { useEffect, useState } from 'react';
import { api_url, token } from '../../config/config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCoursecategories, getCourseGroups } from '../../services/tutor';

const CourseDetails = ({ onNext }) => {
  const [course, setCourse] = useState({
    courseGroup: '',
    courseCategory: '',
    title: '',
    description: '',
    nairaPrice: '',
    author: localStorage.getItem("user") || "Tutor"
  });

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isVideoUploading, setIsVideoUploading] = useState(false);

  const [courseGroups, setCourseGroups] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleUploadImage = async (event) => {
    const uploadedImage = event.target.files[0];
    setImage(uploadedImage);
    setIsImageUploading(true);

    try {
      const formData = new FormData();
      formData.append('files', uploadedImage);
      formData.append('name', 'course image');
      formData.append('type', 'image');

      const response = await axios.post(`${api_url}/images/add`, formData, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setImageUploadProgress(percentCompleted);
        }
      });

      setCourse({ ...course, courseImageUrl: response.data.url });
      setIsImageUploading(false);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while uploading image, please try again.");
      setIsImageUploading(false);
    }
  };

  const handleUploadVideo = async (event) => {
    const uploadedVideo = event.target.files[0];
    setVideo(uploadedVideo);
    setIsVideoUploading(true);

    try {
      const formData = new FormData();
      formData.append('files', uploadedVideo);
      formData.append('name', 'course video');
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

      setCourse({ ...course, courseVideoUrl: response.data.url });
      setIsVideoUploading(false);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while uploading video, please try again.");
      setIsVideoUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(course);
  };

  useEffect(() => {

    const fetchCourseGroups = async () => {
      const data = await getCourseGroups()
      console.log(data)

      setCourseGroups(data.courseGroups)
    }

    fetchCourseGroups()

  }, [])


  const handleCourseGroupChange = async (e) => {
    const selectedValue = e.target.value;


   
    course.courseGroup = selectedValue


    if (course.courseGroup) {
     
      const data = await getCoursecategories(course.courseGroup)
      setCourseCategories(data.courseCategories);
    } else {
      setCourseCategories([]); // Reset subcategories if no category is selected
    }
  };

  return (
    <div>
      <h2>Course Details</h2>
      <form onSubmit={handleSubmit}>
        {/* <label>
          Course Group:
          <input type="text" name="courseGroup" value={course.courseGroup} onChange={handleChange} />
        </label>
        <label>
          Course Category:
          <input type="text" name="courseCategory" value={course.courseCategory} onChange={handleChange} />
        </label> */}

        <label htmlFor="categorySelect">Group:</label>
      <select id="categorySelect" value={course.courseGroup} onChange={handleCourseGroupChange}>
        <option value="">Select a category</option>
        {courseGroups?.map((group) => (
          <option key={group.id} value={group?.code}>
            {group.description}
          </option>
        ))}
      </select>

      <br />

      <label htmlFor="subcategorySelect">Category:</label>
      <select id="subcategorySelect" disabled={!course.courseGroup}>
        <option value="">Select a subcategory</option>
        {courseCategories?.map((category) => (
          <option key={category.id} value={category.code}>
            {category.description}
          </option>
        ))}
      </select>

      


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
        {image && (
          <>
            <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} /> <br />
            <progress value={imageUploadProgress} max="100">{imageUploadProgress}%</progress> <br />{imageUploadProgress == 100 ? "Image upload successfully" : imageUploadProgress + '%'}
          </>
        )}

        <label>
          Course Video:
          <input
            type="file"
            accept="video/*"
            name="courseVideoUrl"
            onChange={handleUploadVideo}
          />
        </label>
        {video && (
          <>
            <progress value={videoUploadProgress} max="100">{videoUploadProgress}%</progress> <br />{videoUploadProgress == 100 ? "Video upload successfully" : videoUploadProgress + '%'}
          </>
        )}

        <br /><br />

        <button type="submit" disabled={isImageUploading || isVideoUploading}>Next</button>
      </form>
    </div>
  );
};

export default CourseDetails;
