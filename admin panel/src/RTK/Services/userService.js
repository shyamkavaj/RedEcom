import axios from "axios";

const getAlluser = async () => {
    try{
        const res = await axios.get("http://localhost:5001/getAlluser")
        return res.data;
    } catch( error ) {
        throw error;
    }
}
const deleteUser = async (id) => {
    try{
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}deleteuser/${id}`)
        return res.data;
    } catch (error) {
        console.log("error in delete user ",error)
        throw error
    }
}
const updateRoleUser = async (data) => {
    try{
        console.log("udate user ",data)
        const res= await axios.patch(`${process.env.REACT_APP_BACKEND_URL}roleupdate/${data.id}`,data
        )
        return res.data;
    } catch (error) {
        console.log("error in update role service ",error)
    }
}
export default {
    getAlluser,deleteUser,updateRoleUser
}