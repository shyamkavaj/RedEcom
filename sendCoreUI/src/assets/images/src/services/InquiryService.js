import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const fetchAllInquiry = async () => {
  try {
    return await baseAPI.get('/contact-list', { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const contactById = async (id) => {
  try {
    return await baseAPI.get(`/contactByIds/${id}`, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const contactPartner = async (data) => {
  const id = data
  try {
    return await baseAPI.post('/contact-partner', { id: id }, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}

const contactPartnerConfirm = async (data) => {
  const partner_id = data.partner_id
  // const id = data
  try {
    return await baseAPI.post(
      '/update-contact',
      { partner_id: partner_id, c_id: data.id },
      { headers: authHeader() },
    )
  } catch (error) {
    console.log(error)
  }
}

const InquiryService = {
  fetchAllInquiry,
  contactPartner,
  contactPartnerConfirm,
  contactById,
}
export default InquiryService
