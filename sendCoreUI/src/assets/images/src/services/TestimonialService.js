import baseAPI from 'src/api/userApi'

const getTestimonialById = async (id) => {
  try {
    return await baseAPI.get(`/testimonialById/${id}`)
  } catch (e) {
    console.log(e)
  }
}
const fetchTestimonial = async () => {
  try {
    return await baseAPI.get('/list-testimonial')
  } catch (e) {
    console.log(e)
  }
}
const createTestimonial = async (data) => {
  try {
    return await baseAPI.post('/create-testimonial', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}
const updateTestimonial = async (data) => {
  try {
    return await baseAPI.post(`/update/${data.id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.log(error)
  }
}
const deleteTestimonial = async (id) => {
  try {
    return await baseAPI.post(`/deleteTestimonial/${id}`)
  } catch (e) {
    console.log(e)
  }
}

const TestimonialService = {
  getTestimonialById,
  fetchTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
}
export default TestimonialService
