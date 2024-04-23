import axios from  'axios'; 


const addOrder = async (order) => {
    try{
        // console.log("qqqqqqqqqqqqqqq",order);
        const res = await axios.post("http://localhost:5001/addorder",order);
        // console.log("==================================================",res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const getAllOrder = async () => {
    try{
        console.log("qqqqqqqqqqqqqqq");
        const res = await axios.get("http://localhost:5001/getallorder");
        // console.log("res.data in get all order",res);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const getOrderbyId = async (id) => {
    try{
        // console.log("qqqqqqqqqqqqqqq");
        const res = await axios.get(`http://localhost:5001/getsingleorder/${id}`);
        // console.log("res.data in get single order",res);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export default {
    addOrder,
    getAllOrder,
    getOrderbyId
}