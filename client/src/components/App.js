import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import '../index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk'

import Reducers from '../reducers/'
import About from './About';
import Login from './Login';
import Register from './Register';
import Home from './Home';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
const App = () => {
  return (
    <div className="App">
      <Provider store={createStoreWithMiddleware(Reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/about" component={About} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
