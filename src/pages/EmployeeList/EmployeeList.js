import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable, Box, Text } from 'grommet';
import EntriesDropdown from '../../components/EntriesDropdown/EntriesDropdown';
import Search from '../../components/Search/Search';
import ColumnHeader from '../../components/ColumnHeader/ColumnHeader';
import CustomPagination from '../../components/Pagination/Pagination';
import '../../styles/pages/EmployeeList.css';

const EmployeeList = () => {
  const storedEmployees = localStorage.getItem('employees');
  const employees = storedEmployees ? JSON.parse(storedEmployees) : [];
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [sort, setSort] = useState({ property: 'firstName', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpArrow, setShowUpArrow] = useState(true);
  const [showDownArrow, setShowDownArrow] = useState(true);

  const handleSearch = (searchValue) => {
    const filtered = employees.filter((employee) =>
      employee.firstName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleSort = (property) => {
    const direction =
      sort.property === property && sort.direction === 'asc' ? 'desc' : 'asc';
    setSort({ property, direction });
    const sorted = [...filteredEmployees].sort((a, b) => {
      const aValue = a[property].toLowerCase();
      const bValue = b[property].toLowerCase();
      return direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
    setFilteredEmployees(sorted);
  };

  const handlePagination = (page) => {
    setEntriesToShow(10);
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredEmployees.length / entriesToShow);

  const columns = [
    { property: 'firstName', label: 'First Name' },
    { property: 'lastName', label: 'Last Name' },
    { property: 'dateOfBirth', label: 'Date of Birth' },
    { property: 'startDate', label: 'Start Date' },
    { property: 'department', label: 'Department' },
    { property: 'street', label: 'Street' },
    { property: 'city', label: 'City' },
    { property: 'state', label: 'State' },
    { property: 'zipCode', label: 'Zip Code' },
  ].map((column) => ({
    property: column.property,
    header: (
      <ColumnHeader
        key={column.property}
        label={column.label}
        property={column.property}
        sort={sort}
        handleSort={handleSort}
        showUpArrow={showUpArrow}
        showDownArrow={showDownArrow}
        setShowUpArrow={setShowUpArrow}
        setShowDownArrow={setShowDownArrow}
      />
    ),
  }));

  return (
    <div className="container">
      <h1>Current Employees</h1>
      <div className="entriesContainer">
        <div className="entriesSearch">
          <EntriesDropdown onSelect={(value) => setEntriesToShow(value)} />
          <Search onSearch={handleSearch} />
        </div>
        <DataTable
          columns={columns}
          data={filteredEmployees.slice(
            (currentPage - 1) * entriesToShow,
            currentPage * entriesToShow
          )}
          primaryKey="firstName"
          border={{
            body: {
              color: 'border',
              side: 'bottom',
              size: 'xsmall',
            },
          }}
          background={{
            body: ['light-0', 'light-1'],
            odd: { color: 'light-0' },
            even: { color: 'light-1' },
          }}
        />
        <Box
          direction="row"
          justify="between"
          align="center"
          margin={{ top: 'small', bottom: 'small' }}
        >
          <Text>
            Showing 1 to {Math.min(entriesToShow, filteredEmployees.length)} of{' '}
            {filteredEmployees.length} entries
          </Text>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => handlePagination(currentPage - 1)}
            onNext={() => handlePagination(currentPage + 1)}
          />
        </Box>
      </div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default EmployeeList;
