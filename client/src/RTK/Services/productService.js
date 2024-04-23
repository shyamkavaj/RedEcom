import axios from "axios";

const addProduct = async (data) => {
    try {
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("price", data.price)
        formData.append("description", data.description)
        formData.append("categ", data.categ)

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
        // console.log("res in err ", res.data)
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
        // console.log('del pro ', res.data)
        return res.data;
    } catch (err) {
        console.log("error in delete product ", err);
        throw err
    }
}

const updateProduct = async (data) => {
    try {
        // console.log("pro id ",data.id)
        // const res = await axios.patch(`http://localhost:5001/updateProductDetail/${data.id}`,data)
        // return res.data
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("price", data.price)
        formData.append("description", data.description)
        formData.append("categ", data.categ)

        for (let i = 0; i < data.image.length; i++) {
            formData.append(`image`, data.image[i]);
        }
        formData.append("subcateId", data.subcateId)
        // console.log("form data ", formData)
        const res = await axios.patch(`http://localhost:5001/updateProductDetail/${data.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('tokenAuth')
            }
        });
        // console.log("res ctrl ", res.data);
        if (res.data.success === 0) {
            return res.data
        }
        const status = {
            data: data,
            success: res.data.success,
            msg: res.data.msg
        }
        return status;

    } catch (error) {
        console.log("error in update product service ", error)
    }
}

const getAllProductByCate = async (id) => {
    try {
        const res = await axios.get(`http://localhost:5001/getProductByCate/${id}`)
        // console.log("all product by cate ", res.data)/
        return res.data
    } catch (error) {
        console.log("error in get all product by cate ", error)
    }
}

const getAllProductByCateAndSub = async (data) => {
    try {
        // console.log("data in get all product by cate and subcate ", data)
        const res = await axios.get(`http://localhost:5001/getProductByCategAndSubCate/${data.id}/${data.categ}`)
        // console.log("all product by cate ", res.data)
        return res.data
    } catch (error) {
        console.log("error in get all product by cate and subcate", error)
    }
}
const getProductById = async (id) => {
    try {
        // console.log("getProductById",id);
        const res = await axios.get(`http://localhost:5001/getSingleProduct/${id}`);
        // console.log("getProductById",res);
        return res.data;
    } catch (err) {
        console.log("error in get all product ", err);
        throw err
    }
}
export default {
    addProduct, getAllProduct, deleteProduct, updateProduct, getAllProductByCate,getAllProductByCateAndSub,getProductById
}