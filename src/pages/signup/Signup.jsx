import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserLoginData } from '../../redux/lawyerSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();

  const [userLoginData, setUserLoginData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the email already exists in local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some((user) => user.email === userLoginData.email);

    if (userExists) {
      alert("User already exists");
      setUserLoginData({ userName: '', email: '', password: '' });
    } else {
      existingUsers.push(userLoginData);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      dispatch(addUserLoginData(userLoginData));
      alert("User registered successfully");
      navigate('/login');

      // Reset form fields
      setUserLoginData({ userName: '', email: '', password: '' });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder='Enter Username'
        name='userName'
        value={userLoginData.userName}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder='Enter Email'
        name='email'
        value={userLoginData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder='Enter Password'
        name='password'
        value={userLoginData.password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
};

export default Signup;
