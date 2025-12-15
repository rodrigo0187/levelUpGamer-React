import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (!user || !user.token) {
        return <Navigate to="/inicio-sesion" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to unauthorized page or home if role doesn't match
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
