import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'
let user = localStorage.getItem('token')
const getAll = async () => {
  try {
    return await baseAPI.get('/list-plan', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const getById = async (id) => {
  try {
    return await baseAPI.get(`/planById/${id}`, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const create = async (data) => {
  try {
    return await baseAPI.post('/create-plan', data, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const update = async (data) => {
  const obj = {
    ...data,
    p_id: data.id,
  }
  try {
    return await baseAPI.post('/update-plan', obj, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const remove = async (data) => {
  try {
    return await baseAPI.post('/delete-plan', { c_id: data }, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const PlanService = {
  getAll,
  getById,
  create,
  update,
  remove,
}

export default PlanService
