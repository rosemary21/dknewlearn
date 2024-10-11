// src/components/SectionForm.js
import React, { useState } from 'react';

const SectionForm = ({ onAddSection }) => {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddSection(title);
      setTitle(''); // Clear the input after submission
    }
  };

  return (
    <div>
      <h2>Add Section</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Section Title: <br /><br />
          <input type="text" value={title} onChange={handleChange} />
        </label>
        <button type="submit" disabled={!title.trim()}>Add Section</button>
      </form>
    </div>
  );
};

export default SectionForm;
