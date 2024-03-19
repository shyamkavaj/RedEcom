import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const fetchAll = async () => {
    try {
        return await baseAPI.get('/list-getstarted', { headers: authHeader() })
    } catch (error) {
        console.log(error)
    }
}

const GetStartedInquiryService = {
    fetchAll
}
export default GetStartedInquiryService