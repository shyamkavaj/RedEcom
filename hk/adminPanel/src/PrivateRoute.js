const { Navigate } = require("react-router-dom")
// import { useAuth } from "./RTK/context/authProvider"
// let token = localStorage.getItem('token')
// const role = localStorage.getItem('role')

const PrivateRoutes = ({children}) => {

    const token = localStorage.getItem('tokenAuth')
    const role = localStorage.getItem('role')
    console.log("role is is ",role)
    return token && (role == 'admin' || role == 'vendor') ? children : <Navigate to="/login"/>
}

export default PrivateRoutes