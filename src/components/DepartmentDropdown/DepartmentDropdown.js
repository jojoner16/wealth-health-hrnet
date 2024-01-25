import React, { useState } from 'react';
import { Select } from 'grommet';
import departments from '../../data/departments.json';

const DepartmentsDropdown = ({ onChange, name }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(
    departments[0].name
  );

  const handleSelectChange = (event) => {
    const selectedValue = event.option.value;
    setSelectedDepartment(selectedValue);
    onChange({ target: { name, value: selectedValue } });
  };
  return (
    <div>
      <label>Department</label>
      <Select
        value={selectedDepartment}
        onChange={handleSelectChange}
        options={departments.map((department) => ({
          label: department.name,
          value: department.name,
        }))}
      />
    </div>
  );
};

export default DepartmentsDropdown;
