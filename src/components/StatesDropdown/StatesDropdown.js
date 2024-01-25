import React, { useState } from 'react';
import { Select } from 'grommet';
import states from '../../data/states.json';

const StatesDropdown = ({ onChange, name }) => {
  const [selectedState, setSelectedState] = useState(states[0].name);

  const handleSelectChange = (event) => {
    const selectedValue = event.value;
    setSelectedState(selectedValue);
    onChange({ target: { name, value: selectedValue.value } });
  };

  return (
    <div>
      <label>State</label>
      <Select
        value={selectedState}
        onChange={handleSelectChange}
        options={states.map((state) => ({
          label: state.name,
          value: state.abbreviation,
        }))}
      />
    </div>
  );
};

export default StatesDropdown;
