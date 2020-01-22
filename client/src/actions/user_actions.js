import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  LOGIN_USER,
  REGISTER_USER
} from './types'

const setAuthToken = token => {
  token ? axios.defaults.headers.common['Authorization'] = token : delete axios.defaults.headers.common['Authorization']
  /*
  if there is a token and logged in, apply the authorization token to every request.
  Otherwise, delete the authentication header.
  */
};

export const setCurrentUser = data => {
  return {
    type: 'SET_CURRENT_USER',
    payload: data
  };
};


export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const signIn = user => dispatch => {
  axios
    .post('/api/users/login', user)
    .then(result => {
      const { token } = result.data;
      localStorage.setItem('jwtToken', token)
      //Saves and stores the token to local storage
      setAuthToken(token);
      //sets the token to auth headers
      const decode = jwt_decode(token);
      //Decodes token to get the user data
      dispatch(setCurrentUser(decode))
      //Sets the current user to the user data we got in decode-variable
    })
    .catch(error => dispatch({ type: GET_ERRORS, payload: error.response.data }))
}

export const signOut = () => dispatch => {

  localStorage.removeItem('jwtToken');
  // Remove token from local storage

  setAuthToken(false);
  // Remove auth header for future requests

  dispatch(setCurrentUser({}));
  // Set current user to empty object {} which will set isAuthenticated to false
};