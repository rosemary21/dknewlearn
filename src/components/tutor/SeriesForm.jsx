// src/components/SeriesForm.js
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { api_url, token } from '../../config/config';

const SeriesForm = ({ onAddSeries }) => {
  const [series, setSeries] = useState({ title: '', videoLink: '', resourceFile: '' });
  const [video, setVideo] = useState(null);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [isVideoUploading, setIsVideoUploading] = useState(true);

  const handleChange = (e) => {
    setSeries({ ...series, [e.target.name]: e.target.value });
  };

  const handleUploadVideo = async (event) => {
    const uploadedVideo = event.target.files[0];
    setVideo(uploadedVideo);
    setIsVideoUploading(true);

    try {
      const formData = new FormData();
      formData.append('files', uploadedVideo);
      formData.append('name', 'course series video');
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

      setSeries({ ...series, videoLink: response.data.url });
      setIsVideoUploading(false);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while uploading video, please try again.");
      setIsVideoUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSeries(series);
    console.log(series);
    setSeries({ title: '', videoLink: '', resourceFile: '' });
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
        {video && (
          <>
            <progress value={videoUploadProgress} max="100">{videoUploadProgress}%</progress><br />{videoUploadProgress == 100 ? "Video upload successfully" : videoUploadProgress + '%'}
          </>
        )}
        <label>
          Resource File:
          <input type="url" name="resourceFile" value={series.resourceFile} onChange={handleChange} />
          
        </label>
        <button type="submit" disabled={isVideoUploading || !series.title}>Add Series</button>
      </form>
    </div>
  );
};

export default SeriesForm;
