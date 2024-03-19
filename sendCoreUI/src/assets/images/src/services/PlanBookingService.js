import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'
// let user = localStorage.getItem('token')
const getAllPlanBookings = async () => {
  try {
    return await baseAPI.get('/plan-booking-list', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const PlanBookingService = {
  getAllPlanBookings,
}
export default PlanBookingService
