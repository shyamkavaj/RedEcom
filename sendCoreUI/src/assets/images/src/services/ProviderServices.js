import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const fetchProviderService = async () => {
  try {
    return await baseAPI.post('/service-list', {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const getProviderServiceById = async (id) => {
  try {
    return await baseAPI.get(`/serviceById/${id}`, {})
  } catch (e) {
    console.log(e)
  }
}

const createProviderService = async (data) => {
  const obj = {
    ...data,
    category_id: parseInt(data.category_id),
    sub_category_id: parseInt(data.sub_category_id),
    sub_sub_category_id: parseInt(data.sub_sub_category_id),
  }

  try {
    return await baseAPI.post('/create-service', obj, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}

const updateProviderService = async (data) => {
  const obj = {
    ...data,
    s_id: data.id,
    category_id: parseInt(data.category_id),
    sub_category_id: parseInt(data.sub_category_id),
    sub_sub_category_id: parseInt(data.sub_sub_category_id),
  }
  try {
    return await baseAPI.post('/update-service', obj, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}

const deleteProviderService = async (id) => {
  try {
    return await baseAPI.post(`/delete-service/${id}`, {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const ProviderService = {
  fetchProviderService,
  getProviderServiceById,
  createProviderService,
  updateProviderService,
  deleteProviderService,
}

export default ProviderService
