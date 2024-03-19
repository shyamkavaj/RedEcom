import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ServiceBookingReports from 'src/services/ServiceBookingReports'

export const fetchServiceReport = createAsyncThunk(
  'serviceBooking/fetchServiceReport',
  async () => {
    try {
      const res = await ServiceBookingReports.fetchServiceReport()
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const fetchCustomer = createAsyncThunk('serviceBooking/fetchCustomer', async (data) => {
  try {
    const res = await ServiceBookingReports.fetchCustomer(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const customerBookingReport = createAsyncThunk(
  'serviceBooking/customerBookingReport',
  async (data) => {
    try {
      const res = await ServiceBookingReports.customerBookingReport(data)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const updateServicebooking = createAsyncThunk(
  'serviceBooking/updateServicebooking',
  async (data) => {
    try {
      const res = await ServiceBookingReports.updateServicebooking(data)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)

const initialState = {
  loading: false,
  error: '',
  bookings: [],
  customers: [],
  booking: {},
  customer: {},
  serviceBooking: {},
}

const serviceBookingReportsSlice = createSlice({
  name: 'serviceBooking',
  initialState,
  extraReducers(builder) {
    //SERVICE BOOKING
    builder
      .addCase(fetchServiceReport.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchServiceReport.fulfilled, (state, { payload }) => {
        state.loading = false
        state.bookings = payload
      })
      .addCase(fetchServiceReport.rejected, (state) => {
        state.loading = false
      })

    //GET ALL CUSTOMER
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCustomer.fulfilled, (state, { payload }) => {
        state.loading = false
        state.customers = payload
      })
      .addCase(fetchCustomer.rejected, (state) => {
        state.loading = false
      })

    //GET ALL CUSTOMER
    builder
      .addCase(customerBookingReport.pending, (state) => {
        state.loading = true
      })
      .addCase(customerBookingReport.fulfilled, (state, { payload }) => {
        state.loading = false
        state.customers = payload
      })
      .addCase(customerBookingReport.rejected, (state) => {
        state.loading = false
      })

    //
    builder
      .addCase(updateServicebooking.pending, (state) => {
        state.loading = true
      })
      .addCase(updateServicebooking.fulfilled, (state, payload) => {
        state.loading = false
        state.serviceBooking = { ...state.serviceBooking, ...payload }
      })
      .addCase(updateServicebooking.rejected, (state) => {
        state.loading = false
      })
  },
})

export default serviceBookingReportsSlice.reducer
