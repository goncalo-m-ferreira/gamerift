import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    // Fetch users from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.sheety.co/182b17ec2dcc0a8d3be919b2baff9dfc/gamerift/folha1');
        if (response.ok) {
          const data = await response.json();
          setUsers(data.folha1);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    fetchData();
  }, []); // Run only once on component mount

  const handleDeleteUser = async (userId) => {
    try {
      // Assume your API supports DELETE method for user deletion
      const response = await fetch(`https://api.sheety.co/182b17ec2dcc0a8d3be919b2baff9dfc/gamerift/folha1/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted user from the local state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        console.log('User deleted successfully');
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error during user deletion:', error.message);
    }
  };

  return (
    <div>
      <h2 className='usermanage'>User Management</h2>
      <Link to="/">
        <button className='backBtn'>Go to Main Page</button>
      </Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span className='userids'>{`ID: ${user.id}, Email: ${user.email}, Password: ${user.password}`}</span>
            <button className='deleteBtn' onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
