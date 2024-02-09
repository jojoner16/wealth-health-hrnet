import React from 'react';
import '../../styles/components/modal.css';

const ModalEmployeeCreated = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Employee Created!</h2>
          <button className="close-button" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
};

export default ModalEmployeeCreated;
