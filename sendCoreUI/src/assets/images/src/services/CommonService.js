import baseAPI from "src/api/userApi";

const getCommonDataService = async () => {
    try {
        return await baseAPI.get("/common-data");
    } catch (error) {
        console.log(error);
    }
};
const getAllCityByState = async id => {
    try {
        return await baseAPI.post("/get-city", { state_id: id });
    } catch (error) {
        console.log(error);
    }
};
const CommonDataService = {
    getCommonDataService,
    getAllCityByState
}
export default CommonDataService