import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = ({ setShowLoginModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    if (errors.length === 0) {
      setShowLoginModal(false)
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-container'>
      <form onSubmit={onLogin} className='login-form'>
        <div className='login-errors-container'>
          {errors.map((error, ind) => (
            <div key={ind} className='login-errors-line'>{error}</div>
          ))}
        </div>
        <div className='login-row'>
          <label htmlFor='email' className='login-form-label'>Email</label>
          <input
            className='login-form-input'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='login-row'>
          <label htmlFor='password' className='login-form-label'>Password</label>
          <input
            className='login-form-input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <div className='login-button-container'>
            <button type='submit' className='login-submit-button'>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
