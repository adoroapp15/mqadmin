import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({
    redirectPath = '/',
    children,
  }) => {
    const isLoggin = JSON.parse(sessionStorage.getItem('isLoggin'))
    // console.log(isLoggin,"protected ")
    if (isLoggin === true  ? false : true) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };