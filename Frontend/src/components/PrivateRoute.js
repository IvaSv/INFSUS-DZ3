// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const auth = sessionStorage.getItem('role');
  const location = useLocation();

  console.log('location: ' + location.pathname);

  if (location.pathname === '/register' && auth === 'administrator') {
    return <Component />;
  }
  if (
    location.pathname === '/profil' &&
    (auth === 'administrator' || auth === 'kandidat' || auth === 'instruktor')
  ) {
    return <Component />;
  }
  if (
    location.pathname === '/candidates' &&
    (auth === 'administrator' || auth === 'instruktor')
  ) {
    return <Component />;
  }
  if (location.pathname === '/progress' && auth === 'kandidat') {
    return <Component />;
  }
  if (
    location.pathname === '/studentProgress' &&
    (auth === 'administrator' || auth === 'instruktor')
  ) {
    return <Component />;
  }

  if (
    location.pathname === '/mycalendar' &&
    (auth === 'kandidat' || auth === 'instruktor')
  ) {
    return <Component />;
  }
  if (
    location.pathname === '/usercalendar' &&
    (auth === 'administrator' || auth === 'instruktor')
  ) {
    return <Component />;
  }
  if (location.pathname === '/instructors' && auth === 'administrator') {
    return <Component />;
  }

  return <Navigate to="/home" />;
};

export default PrivateRoute;
