import baseAPI from 'src/api/userApi'

const getAllFaq = async () => {
  try {
    return await baseAPI.get('/list-faq')
  } catch (e) {
    console.log(e)
  }
}

const getFaqById = async (id) => {
  try {
    return await baseAPI.get(`/faqById/${id}`)
  } catch (e) {
    console.log(e)
  }
}

const createFaq = async (data) => {
  try {
    return await baseAPI.post('/create-faq', data)
  } catch (error) {
    console.log(error)
  }
}

const updateFaq = async (data) => {
  try {
    return await baseAPI.post('/update-faq', data)
  } catch (error) {
    console.log(error)
  }
}

const deleteFaq = async (id) => {
  try {
    return await baseAPI.post(`/delete-faq/${id}`)
  } catch (e) {
    console.log(e)
  }
}

const FaqService = {
  getAllFaq,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
}

export default FaqService
