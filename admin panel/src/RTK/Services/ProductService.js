import axios from "axios";

const addProduct = async (data) => {
    try {
        const res = await axios.post("http://localhost:5001/addProduct", { data });
        return res.data;
    } catch (err) {
        console.log("error in add product ",err);
        throw err
    }
}
export default {
    addProduct
}