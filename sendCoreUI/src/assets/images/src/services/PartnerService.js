import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const fetchPartners = async () => {
  try {
    return await baseAPI.get('/partner-list', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const createPartner = async (data) => {
  try {
    return await baseAPI.post('/create-partner', data, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
//Fetch Users By Partner

const fetchUsersByPartner = async () => {
  try {
    return await baseAPI.post('/partner-user', {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
//Partner BY Service
const fetchPartnerService = async () => {
  try {
    return await baseAPI.get('/getAllUserServices', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const PartnerService = {
  fetchPartners,
  createPartner,
  fetchUsersByPartner,
  fetchPartnerService,
}
export default PartnerService
