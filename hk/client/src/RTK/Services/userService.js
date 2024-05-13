
import axios from "axios";

const addUser = async(data) =>{
    try{
        const res = await axios.post("http://localhost:5001/signup",{data});
        // console.log("res is ",res.data)
        return res.data
        // res.status(200).json(res.data);
    }catch(err){
        throw err;
    }
}
const loginUser = async(data) =>{
    try{
        const res = await axios.post("http://localhost:5001/login",{data});
        // console.log("login user service ",res.data)
        localStorage.setItem("token",res.data.token)
        return res.data
    }catch(err){
        throw err;
    }
}
export default {
    addUser,
    loginUser
}



