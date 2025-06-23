import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../Context/Appcontext';

const PrivateRoute = () => {
  const { user } = useAppContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;