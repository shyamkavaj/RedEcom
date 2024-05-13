import axios from "axios";

const getAllFaq = async ()=>{
    try {
        return await axios.get('http://localhost:5001/getAllFaq');
    } catch (error) {
        console.log("error",error);
        throw error;
    }
};

const addFaq = async (data)=>{
    try {
        console.log("faq addservices", data);
        const res = await axios.post('http://localhost:5001/addFaq',data);
        console.log("faq after addservices", res);
        // res.status(200).json(res.data);
        return res.data
    } catch (error) {
        console.log("error",error);
        throw error;
    }
};

const deleteFaq = async (id)=>{
    try {
        return await axios.delete(`http://localhost:5001/deleteFaq/${id}`,id);
    } catch (error) {
        console.log("error",error);
        throw error;
    }
};

export default{
    getAllFaq,
    addFaq,
    deleteFaq
}