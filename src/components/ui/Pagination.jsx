import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({ currentPage, onPageChange, totalData, onClick }) => {
  const totalPages = Math.ceil(totalData / 10);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);


  const handleNext = (page) => {
    onPageChange(page)
    onClick()
  }

  return (
    <div className="pagination">
      {pages.map(page => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => handleNext(page)}
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
  totalData: PropTypes.number.isRequired,
};

export default Pagination;
