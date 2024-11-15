import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import EmployeePortal from './components/EmployeePortal';
import AdminDashboard from './components/AdminDashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/transactionform" element={<TransactionForm />} />
        <Route path="/employeeportal" element={<EmployeePortal />} />

      </Routes>
    </Router>
  );
};

export default App;
