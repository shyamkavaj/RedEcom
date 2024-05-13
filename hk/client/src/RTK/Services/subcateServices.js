import axios from "axios";

const getAllSubCat = async ()=>{
    try {
        const res = await axios.get("http://localhost:5001/getallsubcategory")
        // console.log("in cate --------- services",res);
        // console.log("all sub cat",res.data);
        return res;
    } catch (error) {
        throw error;
    }
}
const addSubcate = async (data)=>{
    try{
        const res = await axios.post("http://localhost:5001/addsubcategory",data)
        return res.data;
    } catch( error ){
        throw error;
    }
}
const deleteSubcate = async (id)=>{
    try{
        const res = await axios.delete(`http://localhost:5001/deletesubcategory/${id}`)
        return res.data;
    } catch( error ){
        throw error;
    }
}
const updateSubCate = async (data) => {
    try{
        console.log("update sub cate ",data);
        const res = await axios.patch(`http://localhost:5001/updatesubcat/${data.id}`,)
    } catch( error ){
        throw error;
    }
}
const getCate = async (id)=>{
    try{
        const res = await axios.get(`http://localhost:5001/getCateId/${id}`)
        // console.log("in sub cate cate_name ",res.data);
        return res.data;
    } catch( error ){
        throw error;
    }
}
export default {
    getAllSubCat,addSubcate,getCate,deleteSubcate
}