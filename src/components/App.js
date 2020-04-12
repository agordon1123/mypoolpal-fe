import React from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import { Route } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import Nav from './Nav';
import Dashboard from './Dashboard';
import AddPool from './AddPool/AddPool';
import Pool from './Pool';
import AddReading from './AddReading/AddReading';
import Reading from './Reading';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Nav />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/new-pool' component={AddPool} />
      <PrivateRoute exact path='/pool/:id' component={Pool} />
      <PrivateRoute path='/pool/:id/new-reading' component={AddReading} />
      <PrivateRoute path='/pool/:id/reading/:id' component={Reading} />
      <Footer />
    </div>
  );
}

export default App;