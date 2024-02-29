import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DataTable, Box, Text } from 'grommet';
import EntriesDropdown from '../../components/EntriesDropdown/EntriesDropdown';
import Search from '../../components/Search/Search';
import ColumnHeader from '../../components/ColumnHeader/ColumnHeader';
import CustomPagination from '../../components/Pagination/Pagination';
import employeeData from '../../data/employee.json';
import '../../styles/pages/EmployeeList.css';

const EmployeeList = () => {
  // Récupération des employés depuis le local storage
  const localEmployees = useMemo(() => {
    const storedEmployees = localStorage.getItem('employees');
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  }, []);

  // Fusion des employés locaux avec ceux du fichier JSON en évitant les doublons
  const mergedEmployees = useMemo(() => {
    // Crée un ensemble pour stocker les identifiants uniques des employés
    const uniqueIds = new Set();

    // Fusionne les employés locaux avec ceux du fichier JSON
    const merged = [
      ...localEmployees.filter((localEmp) => {
        if (!uniqueIds.has(localEmp.id)) {
          uniqueIds.add(localEmp.id);
          return true;
        }
        return false;
      }),
      ...employeeData.filter((emp) => !uniqueIds.has(emp.id)),
    ];

    return merged;
  }, [localEmployees]);

  // États pour gérer la pagination et la liste filtrée des employés
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [filteredEmployees, setFilteredEmployees] = useState(mergedEmployees);
  const [sort, setSort] = useState({ property: 'firstName', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpArrow, setShowUpArrow] = useState(true);
  const [showDownArrow, setShowDownArrow] = useState(true);

  // Fonction de recherche d'employés par prénom
  const handleSearch = (searchValue) => {
    const filtered = mergedEmployees.filter((employee) =>
      employee.firstName.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredEmployees(filtered);
  };

  // Fonction de tri des employés par propriété
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

  // Fonction de gestion de la pagination
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(filteredEmployees.length / entriesToShow);

  // Configuration des colonnes pour le tableau
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

  // Calcul des employés à afficher sur la page actuelle
  console.log('Filtered employees:', filteredEmployees);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = Math.min(
    startIndex + entriesToShow,
    filteredEmployees.length
  );
  const displayedEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Sauvegarde des employés dans le local storage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(mergedEmployees));
  }, [mergedEmployees]);

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
          data={displayedEmployees}
          primaryKey="id"
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
            Showing {startIndex + 1} to {endIndex} of {filteredEmployees.length}{' '}
            entries
          </Text>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => handlePagination(currentPage - 1)}
            onNext={() => handlePagination(currentPage + 1)}
            onPageClick={handlePagination}
          />
        </Box>
      </div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default EmployeeList;
