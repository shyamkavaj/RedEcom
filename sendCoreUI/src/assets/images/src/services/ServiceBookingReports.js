import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const fetchServiceReport = async () => {
  try {
    return await baseAPI.get('/booking-list', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const fetchCustomer = async (data) => {
  const obj = {
    id: parseInt(data),
  }
  try {
    return await baseAPI.post('/customer', obj, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const updateServicebooking = async (data) => {
  const obj = {
    ...data,
    s_id: data.s_id,
  }
  try {
    return await baseAPI.post('/update-service-booking', obj, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const ServiceBookingReports = {
  fetchServiceReport,
  fetchCustomer,
  updateServicebooking,
}
export default ServiceBookingReports
