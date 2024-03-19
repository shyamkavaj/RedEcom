import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'
const getAllEvent = async () => {
  try {
    return await baseAPI.get('/event-list')
  } catch (error) {
    console.log(error)
  }
}

const getEventById = async (id) => {
  try {
    return await baseAPI.post(`/eventById/${id}`, {})
  } catch (error) {
    console.log(error)
  }
}

const createEvent = async (data) => {
  try {
    return await baseAPI.post('/create-event', data, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}

const updateEvent = async (data) => {
  const obj = {
    ...data,
    e_id: data.id,
  }
  try {
    return await baseAPI.post('/update-event', obj, { headers: authHeader() })
  } catch (error) {
    console.log(error)
  }
}
const deleteEvent = async (e_id) => {
  try {
    return await baseAPI.post(`/delete-event/${e_id}`, {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const EventService = {
  getAllEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
}
export default EventService
