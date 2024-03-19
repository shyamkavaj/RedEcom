import baseAPI from 'src/api/userApi'

const getLegalServiceById = async (id) => {
  try {
    return await baseAPI.get(`/legalServiceById/${id}`)
  } catch (e) {
    console.log(e)
  }
}
const fetchLegalService = async () => {
  try {
    return await baseAPI.get('/list-legal-service')
  } catch (e) {
    console.log(e)
  }
}
const addLegalService = async (data) => {
  try {
    return await baseAPI.post('/create-legal-service', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}
const updateLegalService = async (data) => {
  try {
    return await baseAPI.post(`/update-legal-service/${data.id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}
const deleteLegalService = async (id) => {
  try {
    return await baseAPI.post(`delete-legal-service/${id}`)
  } catch (e) {
    console.log(e)
  }
}

const LegalService = {
  getLegalServiceById,
  fetchLegalService,
  addLegalService,
  updateLegalService,
  deleteLegalService,
}
export default LegalService
