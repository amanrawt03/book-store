import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
const ProtectedRoutes = () => {
    const user = useSelector(store=>store.user.username)
    console.log(user)
  return (
    user?<Outlet/>:<Navigate to="/signin"/>
  )
}

export default ProtectedRoutes


// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import axios from 'axios';

// const ProtectedRoutes = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // To manage loading state
//   const [error, setError] = useState(null); // To handle errors

//   useEffect(() => {
//     // Check the token in the cookies when the component mounts
//     axios
//       .get('/api/auth/protect', { withCredentials: true })
//       .then(response => {
//         if (response.status === 200) {
//           setIsAuthenticated(true); // If valid token, set authenticated
//         }
//       })
//       .catch(err => {
//         setIsAuthenticated(false); // If invalid token, set not authenticated
//         setError(err.message); // Optional: Set error message for debugging
//       });
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // You can show a loader or a spinner while checking the token
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoutes;
