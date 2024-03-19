import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DashBoardService from 'src/services/DashBoardService'

export const getAllRevenue = createAsyncThunk('dashboard/getAll', async () => {
  try {
    const res = await DashBoardService.getAllRevenue()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getTotalSubAdmin = createAsyncThunk('subAdmin/getAll', async () => {
  try {
    const res = await DashBoardService.getTotalSubAdmin()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getTotalUser = createAsyncThunk('totalUser/getAll', async () => {
  try {
    const res = await DashBoardService.getTotalUser()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getTotalActiveUser = createAsyncThunk('activeUser/getAll', async () => {
  try {
    const res = await DashBoardService.getTotalActiveUser()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getTotalActiveService = createAsyncThunk('activeService/getAll', async () => {
  try {
    const res = await DashBoardService.getTotalActiveService()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getTotalRevenueGraph = createAsyncThunk('revenuegraph/getAll', async () => {
  try {
    const res = await DashBoardService.getTotalRevenueGraph()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getTotalUserGraph = createAsyncThunk('usergraph/getAll', async () => {
  try {
    const res = await DashBoardService.getTotalUserGraph()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getTotalSubAdminGraph = createAsyncThunk('subadmingraph/getAll', async () => {
  try {
    const res = await DashBoardService.getTotalSubAdminGraph()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getTotalActiveUSerGraph = createAsyncThunk('activeusergraph/getAll', async () => {
  try {
    const res = await DashBoardService.getTotalActiveUSerGraph()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

const initialState = {
  loading: false,
  error: '',
  dashboards: [],
  subAdmins: [],
  tusers: [],
  services: [],
  activeUser: [],
  revenueGraph: [],
  userGraph: [],
  subAdminGraph: [],
  activeUserGraph: [],
  dashboard: null,
}

const dashBoardSlice = createSlice({
  name: 'dashboards',
  initialState,
  extraReducers: {
    // revenue
    [getAllRevenue.pending]: (state) => {
      state.loading = true
    },
    [getAllRevenue.fulfilled]: (state, action) => {
      state.loading = false
      state.dashboards = action.payload
    },
    [getAllRevenue.rejected]: (state, action) => {
      state.loading = false
      state.dashboards = []
    },
    // Sub Admin
    [getTotalSubAdmin.pending]: (state) => {
      state.loading = true
    },
    [getTotalSubAdmin.fulfilled]: (state, action) => {
      state.loading = false
      state.subAdmins = action.payload
    },
    [getTotalSubAdmin.rejected]: (state, action) => {
      state.loading = false
      state.subAdmins = []
    },
    // USers
    [getTotalUser.pending]: (state) => {
      state.loading = true
    },
    [getTotalUser.fulfilled]: (state, action) => {
      state.loading = false
      state.tusers = action.payload
    },
    [getTotalUser.rejected]: (state, action) => {
      state.loading = false
      state.tusers = []
    },
    // Active USer
    [getTotalActiveUser.pending]: (state) => {
      state.loading = true
    },
    [getTotalActiveUser.fulfilled]: (state, action) => {
      state.loading = false
      state.activeUser = action.payload
    },
    [getTotalActiveUser.rejected]: (state, action) => {
      state.loading = false
      state.activeUser = []
    },
    //Active Service
    [getTotalActiveService.pending]: (state) => {
      state.loading = true
    },
    [getTotalActiveService.fulfilled]: (state, action) => {
      state.loading = false
      state.services = action.payload
    },
    [getTotalActiveService.rejected]: (state, action) => {
      state.loading = false
      state.services = []
    },

    // revenue Graph
    [getTotalRevenueGraph.pending]: (state) => {
      state.loading = true
    },
    [getTotalRevenueGraph.fulfilled]: (state, action) => {
      state.loading = false
      state.revenueGraph = action.payload
    },
    [getTotalRevenueGraph.rejected]: (state, action) => {
      state.loading = false
      state.revenueGraph = []
    },

    // User Graph
    [getTotalUserGraph.pending]: (state) => {
      state.loading = true
    },
    [getTotalUserGraph.fulfilled]: (state, action) => {
      state.loading = false
      state.userGraph = action.payload
    },
    [getTotalUserGraph.rejected]: (state, action) => {
      state.loading = false
      state.userGraph = []
    },

    // subAdmin Graph
    [getTotalSubAdminGraph.pending]: (state) => {
      state.loading = true
    },
    [getTotalSubAdminGraph.fulfilled]: (state, action) => {
      state.loading = false
      state.subAdminGraph = action.payload
    },
    [getTotalSubAdminGraph.rejected]: (state, action) => {
      state.loading = false
      state.subAdminGraph = []
    },

    // Active User Graph
    [getTotalActiveUSerGraph.pending]: (state) => {
      state.loading = true
    },
    [getTotalActiveUSerGraph.fulfilled]: (state, action) => {
      state.loading = false
      state.activeUserGraph = action.payload
    },
    [getTotalActiveUSerGraph.rejected]: (state, action) => {
      state.loading = false
      state.activeUserGraph = []
    },
  },
})

export default dashBoardSlice.reducer
