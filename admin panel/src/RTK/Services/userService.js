import axios from "axios";

const getAlluser = async () => {
    try{
        const res = await axios.get("http://localhost:5001/getAlluser")
        return res;
    } catch( error ) {
        throw error;
    }
}

export default {
    getAlluser,
}