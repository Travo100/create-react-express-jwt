import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';

import './index.css';
import App from './App';
import {AuthProvider, useAuth} from './utils/auth'


import registerServiceWorker from './registerServiceWorker';

// Our Components
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

// Here is if we have an id_token in localStorage
if (localStorage.getItem('id_token')) {
  // then we will attach it to the headers of each request from react
  // application via axios
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('id_token')}`;
}

function ProtectedRoute({ children, ...rest }) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return children;
  }
  return <Redirect to="/signup" />;
}

ReactDOM.render(
  <AuthProvider>
    <Router>
      <div>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/">
            <App />
          </ProtectedRoute>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <ProtectedRoute exact path="/profile">
            <Profile />
          </ProtectedRoute>
        </Switch>
      </div>
    </Router>
  </AuthProvider>,
  document.getElementById('root')
);
registerServiceWorker();
