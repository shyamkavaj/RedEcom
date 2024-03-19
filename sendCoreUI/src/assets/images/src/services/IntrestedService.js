import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const getAllintrestEvent = async () => {
  try {
    return await baseAPI.get('/getAll-intrest-event', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const IntrestedList = {
  getAllintrestEvent,
}
export default IntrestedList
