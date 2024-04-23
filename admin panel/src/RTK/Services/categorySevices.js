import axios from "axios";

const addCate = async (data) => {
  try {
    // console.log("in services", data);
    const res = await axios.post('http://localhost:5001/addCategory', data);
    return res.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};
const getAllCate = async () => {
  try {
    const res = await axios.get('http://localhost:5001/getallcategory');
    return res.data;
  } catch (error) {
    console.log("Error", error);
  }
}
// const deleteCate = async (id) => {
//   try {
//     const res = await axios.delete(`http://localhost:5001/deletecategory/${id}`);
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// }
const deleteCate = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5001/deletecategory/${id}`);
    console.log('del cate ', res.data)
    return res.data;
  } catch (err) {
    console.log("error in delete category ", err);
    throw err
  }
}
const getSingleCate = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5001/getcategory/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error", error);
    throw err;
  }
}
const editCategory = async (data) => {
  try {
    console.log("data is ",data)
    const name= data.name
    const res = await axios.patch(`http://localhost:5001/updatecategory/${data.id}`, {name});
    console.log("data  after services  ",res)
    return res.data;
  } catch (error) {
    console.log("Error", error);
  }
}
export default {
  addCate, getAllCate, deleteCate, getSingleCate,editCategory
}
