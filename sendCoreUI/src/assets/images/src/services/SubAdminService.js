import baseAPI from "src/api/userApi"
import { authHeader } from "src/helpers/authHeader"

const getSubAdminById = async () => {
    try {
        return await baseAPI.get("/get-user", { headers: authHeader() })
    } catch (error) {
        console.log(error)
    }
}
const fetchSubAdmin = async () => {
    try {
        return await baseAPI.get("/subAdmin-list", { headers: authHeader() })
    } catch (error) {
        console.log(error)
    }
}
const createSubAdmin = async (data) => {
    try {
        return await baseAPI.post("/create-sub-admin", data, { headers: authHeader() })
    } catch (error) {
        console.log(error)
    }
}

const SubAdminService = {
    fetchSubAdmin,
    createSubAdmin,
    getSubAdminById
}
export default SubAdminService