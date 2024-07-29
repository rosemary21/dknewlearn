import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({ currentPage, onPageChange }) => {
  const pages = [1, 2, 3, 4, 5]; // Assuming we show a fixed 5 pages for now

  return (
    <div className="pagination">
      {pages.map(page => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
