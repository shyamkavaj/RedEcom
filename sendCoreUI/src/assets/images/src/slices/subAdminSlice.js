import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CommonDataService from 'src/services/CommonService'
import SubAdminService from 'src/services/SubAdminService'

export const getSubAdminById = createAsyncThunk('subAdmin/getSubAdminById', async (id) => {
  try {
    const res = await SubAdminService.getSubAdminById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const fetchSubAdmin = createAsyncThunk('subAdmin/fetchSubAdmin', async () => {
  try {
    const res = await SubAdminService.fetchSubAdmin()
    return res.data.data.User
  } catch (error) {
    console.log(error)
  }
})
export const createSubAdmin = createAsyncThunk('subAdmin/createSubAdmin', async (data) => {
  try {
    const res = await SubAdminService.createSubAdmin(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const fetchOccupation = createAsyncThunk('subAdmin/fetchOccupation', async () => {
  try {
    const res = await CommonDataService.getCommonDataService()
    return res.data.data.occupation
  } catch (error) {
    console.log(error)
  }
})

export const getAllState = createAsyncThunk('subAdmin/getAllState', async () => {
  try {
    const res = await CommonDataService.getCommonDataService()
    return res.data.data.state
  } catch (error) {
    console.log(error)
  }
})
export const getAllCityByState = createAsyncThunk('subAdmin/getAllCityByState', async (id) => {
  try {
    const res = await CommonDataService.getAllCityByState(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
const initialState = {
  loading: false,
  error: '',
  subAdmins: [],
  states: [],
  citys: [],
  occupations: [],
  subAdmin: {},
  state: {},
  city: {
    state_id: undefined,
  },
  occupation: {},
}
const subAdminSlice = createSlice({
  name: 'subAdmin',
  initialState,
  extraReducers(builder) {
    //GET ALL STATE

    builder
      .addCase(getAllState.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllState.fulfilled, (state, { payload }) => {
        state.loading = false
        state.states = payload
      })
      .addCase(getAllState.rejected, (state) => {
        state.loading = false
      })

    //GET ALL CITY

    builder
      .addCase(getAllCityByState.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllCityByState.fulfilled, (state, { payload }) => {
        state.loading = false
        state.citys = payload
      })
      .addCase(getAllCityByState.rejected, (state) => {
        state.loading = false
      })

    // GET bY ID SUB ADMIN

    builder
      .addCase(getSubAdminById.pending, (state) => {
        state.loading = true
      })
      .addCase(getSubAdminById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.subAdmin = { ...state.subAdmin, ...payload }
      })
      .addCase(getSubAdminById.rejected, (state) => {
        state.loading = false
      })

    // GET ALL OCCUPATION

    builder
      .addCase(fetchOccupation.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOccupation.fulfilled, (state, { payload }) => {
        state.loading = false
        state.occupations = payload
      })
      .addCase(fetchOccupation.rejected, (state) => {
        state.loading = false
      })

    // GET ALL SUB ADMIN

    builder
      .addCase(fetchSubAdmin.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSubAdmin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.subAdmins = payload
      })
      .addCase(fetchSubAdmin.rejected, (state) => {
        state.loading = false
      })

    //ADD NEW SUB ADMIN

    builder
      .addCase(createSubAdmin.pending, (state) => {
        state.loading = true
      })
      .addCase(createSubAdmin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.subAdmins = [payload, ...state.subAdmins]
      })
      .addCase(createSubAdmin.rejected, (state) => {
        state.loading = false
      })
  },
})
export default subAdminSlice.reducer
