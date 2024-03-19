import { authHeader } from "src/helpers/authHeader"

import baseAPI from "src/api/userApi"
let user = localStorage.getItem('token');
const getContactById = async (id) => {
    try {
        return await baseAPI.get(`/contactPageById/${id}`, { headers: authHeader() })
    } catch (error) {
        console.log(error)
    }
}
const updateContactUs = async (data) => {
    const obj = {
        ...data,
        c_id: data.id
    }
    try {
        return await baseAPI.post("/update-contactPage", obj, {
            headers: {
                'Authorization': `Bearer ${user}`,
                "Content-Type": "multipart/form-data"
            }
        })
    } catch (error) {
        console.log(error)
    }
}
const ContactUsService = {
    getContactById,
    updateContactUs
}
export default ContactUsService