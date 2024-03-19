import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import PlanBookingService from 'src/services/PlanBookingService'

export const getAllPlanBookings = createAsyncThunk('plan-bookings/getAllPlanBookings', async () => {
  try {
    const res = await PlanBookingService.getAllPlanBookings()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
const initialState = {
  planBookingList: [],
  loading: false,
  error: '',
  plan: null,
}

const planBookingSlice = createSlice({
  name: 'plan-bookings',
  initialState,
  reducers: {},
  extraReducers: {
    // GET ALL Plans
    [getAllPlanBookings.pending]: (state) => {
      state.loading = true
    },
    [getAllPlanBookings.fulfilled]: (state, action) => {
      state.loading = false
      state.planBookingList = action.payload
    },
    [getAllPlanBookings.rejected]: (state, action) => {
      state.loading = false
      state.plans = []
      state.error = action.payload
    },
  },
})

export default planBookingSlice.reducer
