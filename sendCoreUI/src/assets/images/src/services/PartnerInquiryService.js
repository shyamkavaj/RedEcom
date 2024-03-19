import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const fetchPartnerInquiry = async () => {
    try {
        return await baseAPI.get("/list-partner-inquiry", { headers: authHeader() })
    } catch (error) {
        console.log(error)
    }
}

const PartnerInquiryService = {
    fetchPartnerInquiry,
}
export default PartnerInquiryService
