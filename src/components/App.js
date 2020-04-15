import React, { useState } from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import { Route } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import Nav from './Nav';
import Dashboard from './Dashboard';
import AddPool from './AddPool/AddPool';
import Pool from './Pool';
import AddReading from './Readings/AddReading';
import Reading from './Reading';
import Footer from './Footer';
import SelectPool from './SelectPool';

function App() {
  const [pools, setPools] = useState([]);
  const [readings, setReadings] = useState([]);
  console.log(pools)
  console.log(readings)

  return (
    <div className="App">
      <Nav />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/dashboard' component={Dashboard} pools={pools} setPools={setPools} readings={readings} setReadings={setReadings} />
      <PrivateRoute path='/new-pool' component={AddPool} />
      <PrivateRoute exact path='/pool/:id' component={Pool} pools={pools} setPools={setPools} readings={readings} setReadings={setReadings} />
      <PrivateRoute path='/pool/:id/new-reading' component={AddReading} />
      <PrivateRoute path='/pool/:id/reading/:id' component={Reading} />
      <PrivateRoute path='/add-reading' component={SelectPool} />
      <Footer />
    </div>
  );
}

export default App;