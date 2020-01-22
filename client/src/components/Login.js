import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../actions/user_actions'


const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    // let myForm = document.querySelector('#myForm');
    // const myFormData = new FormData(myForm);
    let formData = {
      email: email,
      password: password
    }
    dispatch(signIn(formData))
  }


  return (
    <div className='container'>
      <h2>Log in!</h2>
      <div className='row'>
        <form id="myForm" className='col 12' onChange={console.log('takatakataka')} onSubmit={submitForm}>
          <div className='row'>
            <div className='input-field col s12'>
              <label htmlFor='email'>Email</label>
              <input name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                id='email' type='email' />
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <label htmlFor='password'>Password</label>
              <input name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                id='password' type='password' />
            </div>
          </div>
          <div className='row'>
            <div className='col s12'>
              <button className='btn' type='submit' name='action'>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}


export default Login
