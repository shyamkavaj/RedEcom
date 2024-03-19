import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'
let user = localStorage.getItem('token')
const getAllHome = async () => {
  try {
    return await baseAPI.get('/common-data')
  } catch (error) {
    console.log(error)
  }
}
const updateHome = async (data) => {
  try {
    return await baseAPI.post('/update-setting', data, {
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}
const HomeService = {
  updateHome,
  getAllHome,
}
export default HomeService
