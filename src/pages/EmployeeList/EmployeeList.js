import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/EmployeeList.css';

const EmployeeList = () => {
  // Récupérer les employés depuis le stockage local
  const storedEmployees = localStorage.getItem('employees');
  const employees = storedEmployees ? JSON.parse(storedEmployees) : [];

  return (
    <div className="container">
      <h1>Current Employees</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.startDate}</td>
              <td>{employee.department}</td>
              <td>{employee.street}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">Home</Link>
    </div>
  );
};

export default EmployeeList;
