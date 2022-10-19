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

  if (user) {
    setShowLoginModal(false)
    return <Redirect to='/' />;
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      console.log(data)
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='login-form-container'>
      <form onSubmit={onLogin} className='login-form'>
        <div className='login-header'>
          <h3 className='login-header-text'>Sign in</h3>
        </div>
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
