import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from '../actions/user_actions';



const Register = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
    }
    dispatch(registerUser(newUser, props.history))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">

          <div>
            <h4>
              <b>Register</b> below
              </h4>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => { setName(e.target.value) }}
                value={name}
                error={errors.name}
                id="name"
                type="text"
              />
              <span>{errors.name}</span>
            </div>
            <div className='form-group'>
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
                error={errors.email}
                id="email"
                type="email"
              />
              <span >{errors.email}</span>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
                error={errors.password}
                id="password"
                type="password"
              />
              <span className="">{errors.password}</span>
            </div>
            <div >
              <button type="submit" className="btn">
                Sign up
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
