
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isEmail, isValidPassword } from '../components/validator';
import toast from 'react-hot-toast';
import { login } from '../redux/authSlice';


function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!loginDetails.password || !loginDetails.email) {
      toast.error('Please fill all the details');
      return;
    }
    if (!isEmail(loginDetails.email)) {
      toast.error('Invalid email provided');
      return;
    }
    // if (!isValidPassword(loginDetails.password)) {
    //   toast.error('Invalid password provided');
    //   return;
    // }

    // const response = dispatch(login(loginDetails));
    // if (response?.payload?.data) {
    //   navigate('/');
    // }

    dispatch(login({ data: loginDetails, navigate }));

    setLoginDetails({
      email: '',
      password: ''
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5', backgroundImage: 'linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))' }}>
      <form onSubmit={onSubmitHandler} noValidate style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h1>
        <div style={{ marginBottom: '1rem' }}>
          <input 
            type="text" 
            placeholder="Email"
            value={loginDetails.email}   
            onChange={changeHandler}
            required
            name="email"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input 
            type="password" 
            placeholder="Password"
            value={loginDetails.password}   
            onChange={changeHandler}
            required
            name="password"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>
            Login
          </button>
        </div>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#007BFF' }}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
