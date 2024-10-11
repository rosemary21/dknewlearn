// src/components/SectionsTable.js
import React from 'react';
import { FaTrash } from 'react-icons/fa';

const SectionsTable = ({ sections, onSelectSection, onDeleteSection }) => {
  return (
    <div>
      <h2>Sections</h2>

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
      <tr key={section.id}>
        <td>{index + 1}</td>
        <td style={{ }}>{section.title}</td>
        <td>
          
          <span className='view-btn' style={{
                        marginLeft: "5px !important",        marginRight: "20px"
                      }}   onClick={() => onSelectSection(section)}>View</span>
        
          <button
                      className="delete-btn"
                      onClick={() => onDeleteSection(section.id)}
                      style={{
                        margin: 0,
                        width: "40px"
                      }}
                    >
                      <FaTrash/>
                    </button>
        </td>

      </tr>
    ))}
  </tbody>
</table>

        </div>

    </div>
  );
};

export default SectionsTable;
