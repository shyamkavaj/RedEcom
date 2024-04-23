import axios from "axios";
import { useAuth } from "../context/authProvider";
import { useNavigate } from "react-router-dom";
// const {loginToken} = useAuth();
// const navigate = useNavigate();
const loginServices = async (data)=>{
    try {
        console.log("in services",data)
        const res = await axios.post('http://localhost:5001/login',{data});

        console.log("in loginservices",res.data)
        return res.data
        // return data     
    } catch (error) {
        console.log("Error",error);
    }
}

export default {
    loginServices
}