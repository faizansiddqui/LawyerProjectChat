import React from 'react'
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const navigate = useNavigate();
  const handleClick = ()=> {
    localStorage.removeItem('loggedInUserEmail');
    alert("Logout SuccessFull")
    navigate('/');
  }

  return (
    <div>
    <button onClick={handleClick}> Logout </button> 
    <button> Admin Panel </button>
      </div>
  )
}

export default Setting