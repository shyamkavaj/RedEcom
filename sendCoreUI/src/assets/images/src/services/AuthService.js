import baseAPI from "src/api/userApi";


const authRegister = async (data) => {
    try {
        return await baseAPI.post("/create-admin", data);
    } catch (error) {
        console.log(error);
    }
};
const authLogin = async (data) => {
    try {
        return await baseAPI.post("/admin-login", data);
    } catch (error) {
        console.log(error);
    }
};
const AuthService = {
    authRegister,
    authLogin
}
export default AuthService
