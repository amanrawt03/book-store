import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoutes = () => {
    // Get the token from cookies
    const token = Cookies.get('token')  // Assuming the cookie name is 'token'
    
    // If token exists, allow access to the route; otherwise, redirect to /signin
    return token ? <Outlet /> : <Navigate to="/signin" />
}

export default ProtectedRoutes
