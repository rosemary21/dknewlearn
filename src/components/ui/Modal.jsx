// src/components/Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, children, title }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-button" onClick={handleClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button onClick={handleClose}>Cancel</button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
