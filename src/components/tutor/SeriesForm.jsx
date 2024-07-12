// src/components/SeriesForm.js
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { api_url, token } from '../../config/config';

const SeriesForm = ({ onAddSeries }) => {
  const [series, setSeries] = useState({ title: '', videoLink: '', resourceFile: '' });

  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setSeries({ ...series, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSeries(series);
    console.log(series)
    setSeries({ title: '', videoLink: '', resourceFile: '' });
  };

  const handleUploadVideo = async (event) => {
    const uploadedVideo = event.target.files[0];
    setVideo(uploadedVideo);

    try {
      const formData = new FormData();
      formData.append('files', uploadedVideo);
      formData.append('name', 'course series video');
      formData.append('type', 'video');



      const response = await axios.post(`${api_url}/images/add`, formData, {
        headers: {
          'apiKey': `${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setSeries({ ...series, videoLink: response.data.url})
  
    } catch (error) {
      
      console.log(error)
        toast.error("An error occurred while uploading video, please try again.");
    } 


  };

  return (
    <div>
      <h2>Add Series</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Series Title:
          <input type="text" name="title" value={series.title} onChange={handleChange} />
        </label>
      
      
        <label>
        Video Link:
          <input type="file" accept="video/*" name="videoLink" onChange={handleUploadVideo} />
        </label>

        <label>
          Resourse File
          <input type="text" name="resourceFile" value={series.resourceFile} onChange={handleChange} />
        </label>

       


        {/* <label>
          Resource File:
          <input type="file" name="resourceFile" value={series.resourceFile} onChange={handleChange} />
        </label> */}
        <button type="submit">Add Series</button>
      </form>
    </div>
  );
};

export default SeriesForm;
