import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ label, value, onChange }) => {
  const handleChange = (date) => {
    onChange(date);
  };

  return (
    <div>
      <label>{label}</label>
      <DatePicker
        selected={value}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default CustomDatePicker;
