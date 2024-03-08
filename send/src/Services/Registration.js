
import axios from "axios";

const addUser = async(data) =>{
    try{
        const res = await axios.post("http://localhost:5001/signup",{data});
    }catch(err){
        throw err;
    }
}
export default {
    addUser
}