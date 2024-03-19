import axios from 'axios'

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // headers: {
  //     "Content-type": "application/json",
  // },
})

export default baseAPI
