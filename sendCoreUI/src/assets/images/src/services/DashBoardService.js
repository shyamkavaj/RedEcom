import baseAPI from 'src/api/userApi'
import { authHeader } from 'src/helpers/authHeader'

const getAllRevenue = async () => {
  try {
    return await baseAPI.post('/total-amount', {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const getTotalSubAdmin = async () => {
  try {
    return await baseAPI.post('/subAdmin', {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const getTotalUser = async () => {
  try {
    return await baseAPI.post('/totalUser', {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const getTotalActiveUser = async () => {
  try {
    return await baseAPI.post('/activeUser', {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const getTotalActiveService = async () => {
  try {
    return await baseAPI.post('/activeService', {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const getTotalRevenueGraph = async () => {
  try {
    return await baseAPI.post('/revenue-graph', {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const getTotalUserGraph = async () => {
  try {
    return await baseAPI.get('/total-user-register-graph', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const getTotalSubAdminGraph = async () => {
  try {
    return await baseAPI.post('/total-subAdmin-graph', {}, { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}
const getTotalActiveUSerGraph = async () => {
  try {
    return await baseAPI.get('/total-active-user-graph', { headers: authHeader() })
  } catch (e) {
    console.log(e)
  }
}

const DashBoardService = {
  getAllRevenue,
  getTotalSubAdmin,
  getTotalUser,
  getTotalActiveUser,
  getTotalActiveService,
  getTotalRevenueGraph,
  getTotalUserGraph,
  getTotalSubAdminGraph,
  getTotalActiveUSerGraph,
}

export default DashBoardService
