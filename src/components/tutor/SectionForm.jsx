// src/components/SectionForm.js
import React, { useState } from 'react';

const SectionForm = ({ onAddSection }) => {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSection(title);
    setTitle('');
  };

  return (
    <div>
      <h2>Add Section</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Section Title:
          <input type="text" value={title} onChange={handleChange} />
        </label>
        <button type="submit">Add Section</button>
      </form>
    </div>
  );
};

export default SectionForm;
