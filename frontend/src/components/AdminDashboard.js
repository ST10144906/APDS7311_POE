// frontend/src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/transactions');
        setTransactions(res.data.transactions);
        setLoading(false);
      } catch (err) {
        setError('Error fetching transactions. Please try again later.');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const toggleVerification = async (transactionId, currentStatus) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/admin/transactions/${transactionId}/verify`);
      setTransactions(transactions.map(transaction =>
        transaction._id === transactionId
          ? { ...transaction, verified: !currentStatus }
          : transaction
      ));
      alert(res.data.msg);
    } catch (err) {
      alert('Error updating transaction: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  const handleProfileClick = () => {
    setShowDropdown(prevState => !prevState);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Employee Dashboard</h2>
        <div className="profile-menu">
          <div className="profile-icon" onClick={handleProfileClick}>
            <img
              src="/path/to/profile-icon.png" 
              alt="Profile"
              className="profile-image"
            />
            <span className="profile-name">Employee</span>
            <button onClick={handleLogout} className="profile-name.logout">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Account Number</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Provider</th>
                  <th>Swift Code</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{transaction.accountInfo}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.currency}</td>
                    <td>{transaction.provider}</td>
                    <td>{transaction.swiftCode}</td>
                    <td className={transaction.verified ? 'verified' : 'not-verified'}>
                      {transaction.verified ? 'Yes' : 'No'}
                    </td>
                    <td>
                      <button
                        className={`verify-button ${transaction.verified ? 'unverify' : 'verify'}`}
                        onClick={() => toggleVerification(transaction._id, transaction.verified)}
                      >
                        {transaction.verified ? 'Unverify' : 'Verify'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
