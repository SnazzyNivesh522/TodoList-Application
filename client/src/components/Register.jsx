// components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input name="username" onChange={onChange} placeholder="Username" required />
      <input name="password" type="password" onChange={onChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;