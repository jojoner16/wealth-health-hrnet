import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable, Text } from 'grommet';
import EntriesDropdown from '../../components/EntriesDropdown/EntriesDropdown';
import Search from '../../components/Search/Search';
import '../../styles/pages/EmployeeList.css';

const EmployeeList = () => {
  const storedEmployees = localStorage.getItem('employees');
  const employees = storedEmployees ? JSON.parse(storedEmployees) : [];
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const columns = [
    { property: 'firstName', header: <Text>First Name</Text> },
    { property: 'lastName', header: <Text>Last Name</Text> },
    { property: 'dateOfBirth', header: <Text>Date of Birth</Text> },
    { property: 'startDate', header: <Text>Start Date</Text> },
    { property: 'department', header: <Text>Department</Text> },
    { property: 'street', header: <Text>Street</Text> },
    { property: 'city', header: <Text>City</Text> },
    { property: 'state', header: <Text>State</Text> },
    { property: 'zipCode', header: <Text>Zip Code</Text> },
  ];

  const handleSearch = (searchValue) => {
    console.log('Search Value in EmployeeList component:', searchValue);

    const filtered = employees.filter((employee) =>
      employee.firstName.toLowerCase().includes(searchValue.toLowerCase())
    );

    console.log('Filtered Employees:', filtered);

    setFilteredEmployees(filtered);
  };
  return (
    <div className="container">
      <h1>Current Employees</h1>
      <div className="entriesSearch">
        <EntriesDropdown onSelect={(value) => setEntriesToShow(value)} />
        <Search onSearch={handleSearch} />
      </div>
      <DataTable
        columns={columns}
        data={filteredEmployees.slice(0, entriesToShow)}
        primaryKey="firstName"
      />
      <Link to="/">Home</Link>
    </div>
  );
};

export default EmployeeList;
