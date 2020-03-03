import React from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import { Route } from 'react-router-dom';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </div>
  );
}

export default App;
