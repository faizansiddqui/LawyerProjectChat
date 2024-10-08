import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Setting = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('loggedInUserEmail');
    alert("Logout Successful");
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
      <Link to='/addData'>
        <button>Admin Panel</button>
      </Link>
    </div>
  );
};

export default Setting;
