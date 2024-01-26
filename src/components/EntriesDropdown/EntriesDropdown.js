import React, { useState } from 'react';
import { Select } from 'grommet';
import '../../styles/components/entriesDropdown.css';

const EntriesDropdown = ({ onSelect }) => {
  const options = [10, 25, 50, 100];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = ({ option }) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="dataTables-length">
      <label>
        Show{' '}
        <Select
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          className="customSelect"
        />{' '}
        entries
      </label>
    </div>
  );
};

export default EntriesDropdown;
