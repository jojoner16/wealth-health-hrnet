import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import CreateEmployee from '../pages/CreateEmployee/CreateEmployee';
import EmployeeList from '../pages/EmployeeList/EmployeeList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/create-employee" />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
};

export default App;
