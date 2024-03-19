import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

let user = localStorage.getItem('token')

const getAllSubCategory = async () => {
  try {
    return await baseAPI.get('/list-sub-category', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const getSubCategoryById = async (id) => {
  try {
    return await baseAPI.get(`/subCategoryById/${id}`, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const createSubCategory = async (data) => {
  try {
    return await baseAPI.post('/create-sub-category', data, {
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}
const updateSubCategory = async (data) => {
  const obj = {
    ...data,
    cat_id: data.id,
  }

  try {
    return await baseAPI.post('/update-sub-category', obj, {
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}
const deleteSubCategory = async (id) => {
  try {
    return await baseAPI.post(`/delete-sub-category/${id}`, {}, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const updateSubCategoryStatus = async (data) => {
  const obj = {
    ...data,
    c_id: data.id,
  }
  try {
    return await baseAPI.post('/update-category-status', obj, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const SubCategoryService = {
  getAllSubCategory,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  updateSubCategoryStatus,
}
export default SubCategoryService
