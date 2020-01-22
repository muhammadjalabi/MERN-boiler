import React from 'react'
import { NavLink } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <p><NavLink to='/'>Go home</NavLink></p>
      <p><NavLink to='/about'>About</NavLink></p>
      <p><NavLink to='/login'>Login</NavLink></p>
      <p><NavLink to='/register'>Register account</NavLink></p>
    </div>
  )
}

export default Home
