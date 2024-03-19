import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const getAll = async () => {
  try {
    return await baseAPI.get('/list-achivement', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const getById = async (id) => {
  try {
    return await baseAPI.get(`/achivementById/${id}`, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const create = async (data) => {
  try {
    return await baseAPI.post('/create-achivement', data, { headers: authHeader() })
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
    return await baseAPI.post('/update-achivement', obj, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}

// const remove = async (id) => {
//     return await baseAPI.post(`/delete-faq/${id}`);
// };

const AchivementService = {
  getAll,
  getById,
  create,
  update,
}

export default AchivementService
