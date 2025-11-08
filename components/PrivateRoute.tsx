
import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: ReactElement;
  roles: Array<'user' | 'admin'>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div></div>;
  }

  if (!user) {
    const redirectTo = roles.includes('admin') ? '/admin/login' : '/auth';
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!roles.includes(user.role)) {
     // If a user tries to access an admin route, redirect them to home.
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
