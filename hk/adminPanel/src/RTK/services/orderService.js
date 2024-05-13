import axios from "axios";
const getAllOrders = async () => {
    try{
        // console.log()
        const res = await axios.get("http://localhost:5001/getallorder");
        // console.log("res is orderservice",res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
const deleteOrder = async (id) => {
    try{
        const res = await axios.delete(`http://localhost:5001/deleteorder/${id}`);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
const addOrder = async (order) => {
    try{
        const res = await axios.post("http://localhost:5001/addorder",order);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const updateOrder = async (data) => {
    try{
        const res = await axios.patch(`http://localhost:5001/updateorder/${data.id}`,{data}
        // {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     }
        // }
        );
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export default {
    getAllOrders,deleteOrder,addOrder,updateOrder
}