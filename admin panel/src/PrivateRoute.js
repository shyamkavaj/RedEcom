const { Navigate } = require("react-router-dom")
// import { useAuth } from "./RTK/context/authProvider"
// let token = localStorage.getItem('token')
// const role = localStorage.getItem('role')

const PrivateRoutes = ({children}) => {

    const token = localStorage.getItem('tokenAuth')
    const role = localStorage.getItem('role')

    return token && role === 'admin' ? children : <Navigate to="/login" />
}

export default PrivateRoutes