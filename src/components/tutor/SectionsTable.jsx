// src/components/SectionsTable.js
import React from 'react';

const SectionsTable = ({ sections, onSelectSection }) => {
  return (
    <div>
      <h2>Sections</h2>
        <div><h3>Title</h3></div>
        <div>
        <table className="table table-hover table-striped">
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {sections.map((section, index) => (
      <tr key={section.id} onClick={() => onSelectSection(section)}>
        <td>{index + 1}</td>
        <td style={{ fontSize: '20px', marginBottom: '20px' }}>{section.title}</td>
        <td><span className='view-btn'>View</span></td>
      </tr>
    ))}
  </tbody>
</table>

        </div>

    </div>
  );
};

export default SectionsTable;
