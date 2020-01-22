import { combineReducers } from 'redux'

import user from './user_reducer.js'
import errors from './error_reducer.js'

const rootReducer = combineReducers({
  user, errors
})

export default rootReducer;