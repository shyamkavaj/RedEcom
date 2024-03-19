import React from 'react'
import { Navigate } from 'react-router-dom'
let user = localStorage.getItem('token')
const role = localStorage.getItem('role')
const PrivateRoutes = ({ children }) => {
  return user && role !== 'Customer' ? children : <Navigate to="/login" />
}

export default PrivateRoutes
