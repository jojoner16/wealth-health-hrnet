import React from 'react';
import departments from '../../data/departments.json';

const DepartmentsDropdown = ({ onChange, name }) => {
  return (
    <div>
      <label>Department</label>
      <select title="Select a department" onChange={onChange} name={name}>
        {departments.map((department) => (
          <option key={department.name} value={department.name}>
            {department.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentsDropdown;
