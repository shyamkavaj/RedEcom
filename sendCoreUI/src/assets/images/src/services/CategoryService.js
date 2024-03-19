import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const getAllCategory = async () => {
  try {
    return await baseAPI.get('/list-category', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const getCategoryById = async (id) => {
  try {
    return await baseAPI.get(`/categoryById/${id}`, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const createCategory = async (data) => {
  try {
    return await baseAPI.post('/create-category', data, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const updateCategory = async (data) => {
  const obj = {
    ...data,
    cat_id: data.cat_id,
  }
  try {
    return await baseAPI.post('/update-category', obj, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const deleteCategory = async (id) => {
  try {
    return await baseAPI.post(`/delete-category/${id}`, {}, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const updateCategoryStatus = async (data) => {
  const obj = {
    ...data,
    c_id: data.id,
  }
  try {
    return await baseAPI.post('/update-status', obj, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const CategoryService = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
}
export default CategoryService
