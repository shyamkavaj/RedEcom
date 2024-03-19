import { authHeader } from 'src/helpers/authHeader'
import baseAPI from 'src/api/userApi'
let user = localStorage.getItem('token')

const getUserBoardPage = async (id) => {
  try {
    return await baseAPI.get(`/dashboardBannerById/${id}`, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const updateUserBoardPage = async (data) => {
  const obj = {
    ...data,
    c_id: data.id,
  }
  try {
    return await baseAPI.post('/update-user-dashboard-page', obj, {
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const UserBoardPageService = {
  getUserBoardPage,
  updateUserBoardPage,
}
export default UserBoardPageService
