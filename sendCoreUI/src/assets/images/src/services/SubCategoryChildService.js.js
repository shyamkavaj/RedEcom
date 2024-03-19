import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const getAllSubCategoryChild = async () => {
  try {
    return await baseAPI.get('/list-sub-sub-category', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const getSubCategoryChildById = async (id) => {
  try {
    return await baseAPI.get(`/subSubCategoryById/${id}`, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const createSubCategoryChild = async (data) => {
  const obj = {
    ...data,
    sub_category_id: parseInt(data.sub_category_id),
  }
  try {
    return await baseAPI.post('/create-subcategory', obj, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const updateSubCategoryChild = async (data) => {
  const data1 = {
    cat_id: data.id,
    status: data.status,
    title: data.title,
    description: data.description,
    sub_category_id: data.sub_category_id,
  }
  try {
    return await baseAPI.post('/update-subcategory', data1, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const deleteSubCategoryChild = async (id) => {
  try {
    return await baseAPI.post(`/delete-subcategory/${id}`, {}, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const SubCategoryChildService = {
  getAllSubCategoryChild,
  getSubCategoryChildById,
  createSubCategoryChild,
  updateSubCategoryChild,
  deleteSubCategoryChild,
}
export default SubCategoryChildService
