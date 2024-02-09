import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomDatePicker from '../../components/DatePicker/DatePicker';
import StatesDropdown from '../../components/StatesDropdown/StatesDropdown';
import DepartmentsDropdown from '../../components/DepartmentDropdown/DepartmentDropdown';
import ModalEmployeeCreated from '../../components/Modal/Modal';
import '../../styles/pages/CreateEmployee.css';

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    department: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  const handleDateChange = (name, event) => {
    //si la valeur de l'événement est définie
    if (event.value) {
      let date;

      // Si la valeur est déjà une instance de Date, utilise-la directement
      if (event.value instanceof Date) {
        date = event.value;
      } else {
        // Sinon, essaie de créer une nouvelle Date à partir de la valeur de l'événement
        date = new Date(event.value);
      }

      // verifie que la date est valide
      if (!isNaN(date.getTime())) {
        const dateString = date.toISOString().split('T')[0];
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          [name]: dateString,
        }));
      } else {
        console.error('Date invalide');
      }
    }
  };

  const handleSaveEmployee = () => {
    const employeesString = localStorage.getItem('employees');
    const employees = employeesString ? JSON.parse(employeesString) : [];

    employees.push(employee);

    localStorage.setItem('employees', JSON.stringify(employees));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={employee.firstName}
            onChange={handleInputChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={employee.lastName}
            onChange={handleInputChange}
          />

          <CustomDatePicker
            label="Date of Birth"
            value={employee.dateOfBirth}
            onChange={(date) =>
              handleDateChange('dateOfBirth', { value: date })
            }
          />
          <CustomDatePicker
            label="Start Date"
            value={employee.startDate}
            onChange={(date) => handleDateChange('startDate', { value: date })}
          />

          <fieldset className="address">
            <label htmlFor="street">Street</label>
            <legend>Address</legend>
            <input
              type="text"
              id="street"
              name="street"
              value={employee.street}
              onChange={handleInputChange}
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={employee.city}
              onChange={handleInputChange}
            />

            <StatesDropdown onChange={handleInputChange} name="state" />

            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={employee.zipCode}
              onChange={handleInputChange}
            />
          </fieldset>

          <DepartmentsDropdown onChange={handleInputChange} name="department" />
        </form>
        <button type="button" onClick={handleSaveEmployee}>
          Save
        </button>
        <ModalEmployeeCreated isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default CreateEmployee;
