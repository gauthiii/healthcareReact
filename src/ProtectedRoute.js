import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    // Redirect to login if not logged in

    const token = localStorage.getItem("authToken");
        

    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
