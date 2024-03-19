import { authHeader } from "src/helpers/authHeader"
import baseAPI from "src/api/userApi"
let user = localStorage.getItem('token');


const getPartnerById = async (id) => {
    try {
        return await baseAPI.get(`/becomePatnerPageById/${id}`, { headers: authHeader() })
    } catch (error) {
        console.log(error)
    }
}
const updatePartner = async (data) => {
    const obj = {
        ...data,
        b_id: data.id
    }
    try {

        return await baseAPI.post("/update-becomePatnerPage", obj, {
            headers: {
                'Authorization': `Bearer ${user}`,
                "Content-Type": "multipart/form-data"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const BecomePartnerService = {
    getPartnerById,
    updatePartner
}
export default BecomePartnerService