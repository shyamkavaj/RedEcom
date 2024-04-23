import axios from "axios";

const getAllFaq = async () => {
    try {
        const res = await axios.get("http://localhost:5001/getAllFaq")
        return res.data;
    } catch (error) {
        console.log("error in get all faq");
        throw error
    }
}

export default {
    getAllFaq
}