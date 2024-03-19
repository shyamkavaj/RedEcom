import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const fetchAllUsers = async () => {
  try {
    return await baseAPI.get('/user-list', { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (data) => {
  try {
    return await baseAPI.post('/createUser', data)
  } catch (e) {
    console.log(e)
  }
}

const getUserById = async (id) => {
  try {
    return await baseAPI.post('/one-user', { id }, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const getPartnerById = async (id) => {
  try {
    return await baseAPI.post('/contact-partner', { id }, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const updateUserStatus = async (data) => {
  const obj = {
    ...data,
    s_id: data.id,
  }
  try {
    return await baseAPI.post('/user-status', obj, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const updateUser = async (data) => {
  try {
    return await baseAPI.post('/user-detail-update', data, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (id) => {
  try {
    return await baseAPI.post(`/delete-user/${id}`, {}, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}

const ManageUsersService = {
  fetchAllUsers,
  createUser,
  updateUserStatus,
  getUserById,
  updateUser,
  getPartnerById,
  deleteUser,
}
export default ManageUsersService
