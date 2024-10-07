import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.email === loginUser.email && user.password === loginUser.password);

    if (userExists) {
      localStorage.setItem('loggedInUserEmail', loginUser.email)
      alert('Login Successful');
      setLoginUser({ email: '', password: '' });
      navigate('/')
    } else {
      alert("Wrong Email or Password");
    }

    // Optionally, reset the form after login attempt
  };


  return (
    <div>
      <input
        type="text"
        placeholder='Enter Email'
        name='email'
        value={loginUser.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder='Enter Password'
        name='password'
        value={loginUser.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login