import baseAPI from "src/api/userApi"
import { authHeader } from "src/helpers/authHeader"

const getById = async () => {
    try {
        return await baseAPI.get("/get-user", { headers: authHeader() })
    } catch (error) {
        console.log(error)
    }
}
const fetchAllAdmin = async () => {
    try {
        return await baseAPI.get("/admin-list", { headers: authHeader() })
    } catch (error) {
        console.log(error)
    }
}
const createAdmin = async (data) => {
    try {
        return await baseAPI.post("/create-admin", data)
    } catch (error) {
        console.log(error)
    }
}
const updateAdmin = async (data) => {
    try {
        return await baseAPI.post("/update-admin", data, { headers: authHeader() })
    } catch (error) {
        console.log(error)
    }
}
const AdminService = {
    fetchAllAdmin,
    createAdmin,
    updateAdmin,
    getById
}
export default AdminService