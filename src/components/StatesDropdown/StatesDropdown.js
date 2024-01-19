import React from 'react';
import states from '../../data/states.json';

const StatesDropdown = ({ onChange, name }) => {
  // Logique d'initialisation du menu déroulant des États
  return (
    <div>
      <label>State</label>
      <select title="Select a state" onChange={onChange} name={name}>
        {states.map((state) => (
          <option key={state.abbreviation} value={state.abbreviation}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatesDropdown;
