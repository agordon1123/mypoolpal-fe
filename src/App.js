import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useAppState } from './AppContext'
import { axiosWithAuth } from './utils/axiosWithAuth';
import { errorHandler } from './utils/errorHandler';
import PrivateRoute from './utils/PrivateRoute';
// components //
// TODO: create an index
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import AddPool from './components/AddPool/AddPool';
import Pool from './components/Pool';
import AddReading from './components/Readings/AddReading';
import Reading from './components/Reading';
import Footer from './components/Footer';
import SelectPool from './components/SelectPool';

const App = () => {
  
  const history = useHistory();
  const [state, dispatch] = useAppState();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // grab use info on mount
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch({ type: 'SET_USER', payload: user });

    if (token) {
      axiosWithAuth()
        .get(`pools/all/${user.id}`)
        .then(res => {
          // convert boolean to string
          res.data.map(pool => pool.is_salt_water === 1 ? pool.is_salt_water = 'salt' : pool.is_salt_water = 'chlorine');
          dispatch({ type: 'SET_POOLS', payload: res.data })
        })
        .catch(err => {
          errorHandler(err.response, history)
        })

      axiosWithAuth()
        .get(`${process.env.REACT_APP_DB_URL}/readings/all/${user.id}`)
        .then(res => {
          // create new date object from timestamp
          res.data.map(el => el.created_at = new Date(el.created_at));
          // sort readings new to old
          let sortedReadings = res.data.sort((a, b) => b.id - a.id);
          dispatch({ type: 'SET_READINGS', payload: sortedReadings });
        })
        .catch(err => {
          errorHandler(err.response, history)
        })
    }
  }, [token]);

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
      <PrivateRoute path='/add-reading' component={SelectPool} />
      <PrivateRoute exact path='/'><Redirect to='/dashboard' /></PrivateRoute>
      <Footer />
    </div>
  );
}

export default App;