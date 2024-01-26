import React from 'react';
import { TextInput } from 'grommet';
import '../../styles/components/search.css';

const Search = ({ onSearch }) => {
  return (
    <div className="searchBar">
      <label>Search: </label>
      <TextInput
        onChange={(event) => {
          const searchValue = event.target.value;
          console.log('Search Value in Search component:', searchValue);
          onSearch(searchValue);
        }}
        placeholder="Type to search..."
      />
    </div>
  );
};

export default Search;
