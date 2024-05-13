import {Outlet,Navigate} from "react-router-dom"
// import {jwtDecode} from "jwt-decode"
const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    // const data = jwtDecode(token);
    // console.log("user data is ",data)
    return (
        <div>
            {token || localStorage.getItem('loginData')? <Outlet/> : <Navigate to="/login"/>}
        </div>
    )
}
export default PrivateRoute;