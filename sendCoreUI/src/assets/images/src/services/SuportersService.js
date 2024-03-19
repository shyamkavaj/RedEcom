import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'
let user = localStorage.getItem('token')

const getAll = async () => {
  try {
    return await baseAPI.get('/common-data')
  } catch (e) {
    console.log(e)
  }
}

const getById = async (id) => {
  try {
    return await baseAPI.get(`/suppoterById/${id}`, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const create = async (data) => {
  try {
    return await baseAPI.post('/create-suppoter', data, {
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const update = async (data) => {
  const obj = {
    ...data,
    a_id: data.id,
  }
  try {
    return await baseAPI.post('/update-suppoter', obj, {
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const remove = async (id) => {
  try {
    return await baseAPI.post(`/delete-suppoter/${id}`)
  } catch (e) {
    console.log(e)
  }
}

const SupportersService = {
  getAll,
  getById,
  create,
  update,
  remove,
}

export default SupportersService
