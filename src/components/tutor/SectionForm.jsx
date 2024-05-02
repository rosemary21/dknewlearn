// src/components/SectionForm.js
import React, { useState } from 'react';

const SectionForm = ({ onAddSection }) => {
  const [sectionTitle, setSectionTitle] = useState('');

  const handleChange = (e) => {
    setSectionTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSection(sectionTitle);
    setSectionTitle('');
  };

  return (
    <div>
      <h2>Add Section</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Section Title:
          <input type="text" value={sectionTitle} onChange={handleChange} />
        </label>
        <button type="submit">Add Section</button>
      </form>
    </div>
  );
};

export default SectionForm;
