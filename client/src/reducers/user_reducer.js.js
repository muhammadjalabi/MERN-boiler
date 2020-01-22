import {
  REGISTER_USER,
  LOGIN_USER
} from '../actions/types'

const initState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        ...state,
        registerSuccess: action.payload
      };
    case 'LOGIN_USER':
      return {
        ...state,
        loginSuccess: action.payload
      };
    default:
      return state;
  }
}
