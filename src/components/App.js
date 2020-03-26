import React from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import { Route } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import Nav from './Nav';
import Dashboard from './Dashboard';
import AddPool from './AddPool/AddPool';

function App() {
  return (
    <div className="App">
      <Nav />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/new-pool' component={AddPool} />
    </div>
  );
}

export default App;