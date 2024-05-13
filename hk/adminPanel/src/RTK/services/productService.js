import axios from "axios";

const addProduct = async (data) => {
    try {
        console.log("add pro ", data);
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("price", data.price)
        formData.append("description", data.description)
        formData.append("categ", data.categ)
        formData.append("place",data.place)
        formData.append("uploadby",data.uploadby)
        for (let i = 0; i < data.image.length; i++) {
            formData.append(`image`, data.image[i]);
        }
        formData.append("subcateId", data.subcateId)
        const res = await axios.post("http://localhost:5001/addProduct", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('tokenAuth')
            }
        });
        console.log("res in err ", res.data)
        return res.data;
    } catch (err) {
        console.log("error in add product ", err);
        throw err
    }
}
const getAllProduct = async () => {
    try {
        const res = await axios.get("http://localhost:5001/getAllProduct");
        return res.data;
    } catch (err) {
        console.log("error in get all product ", err);
        throw err
    }
}
const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:5001/deleteProduct/${id}`);
        console.log('del pro ', res.data)
        return res.data;
    } catch (err) {
        console.log("error in delete product ", err);
        throw err
    }
}
const updateProduct = async (data) => {
    try {
        console.log("update pro ", data);
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("price", data.price)
        formData.append("description", data.description)
        formData.append("categ", data.categ)
        formData.append("id",data.id)

        for (let i = 0; i < data.image.length; i++) {
            formData.append(`image`, data.image[i]);
        }
        formData.append("subcateId", data.subcateId)
        console.log("form data ", formData)
        const values = [...formData.entries()];
        console.log(values);
        const res = await axios.patch(`http://localhost:5001/updateProductDetail/${data.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('tokenAuth')
            }
        });
        console.log("res ctrl ", res.data);
        return res.data;

    } catch (error) {
        console.log("error in update product service ", error)
    }
}
const getProductByEmail = async (data) => {
    try{
        console.log("datra is is ",data)
        const res = await axios.get(`http://localhost:5001/getproductbyemail/`,{data})
        return res.data
    } catch (error) {
        throw error
    }
}
export default {
    addProduct, getAllProduct, deleteProduct, updateProduct, getProductByEmail
}