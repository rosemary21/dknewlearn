// src/components/SeriesForm.js
import React, { useState } from 'react';

const SeriesForm = ({ onAddSeries }) => {
  const [series, setSeries] = useState({ title: '', video: '', resource: '' });

  const handleChange = (e) => {
    setSeries({ ...series, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSeries(series);
    console.log(series)
    setSeries({ title: '', video: '', resource: '' });
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
          <input type="text" name="video" value={series.video} onChange={handleChange} />
        </label>
        <label>
          Resource File:
          <input type="file" name="resource" onChange={handleChange} />
        </label>
        <button type="submit">Add Series</button>
      </form>
    </div>
  );
};

export default SeriesForm;
