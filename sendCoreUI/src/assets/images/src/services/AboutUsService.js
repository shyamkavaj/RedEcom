import { authHeader } from 'src/helpers/authHeader'

import baseAPI from 'src/api/userApi'
let user = localStorage.getItem('token')

const getAboutusById = async (id) => {
  try {
    return await baseAPI.get(`/aboutPageById/${id}`, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const updateAboutUs = async (data) => {
  const obj = {
    ...data,
    c_id: data.id,
  }
  try {
    return await baseAPI.post('/update-aboutPage', obj, {
      headers: {
        Authorization: `Bearer ${user}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const AboutUsService = {
  getAboutusById,
  updateAboutUs,
}
export default AboutUsService
