import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import InquiryService from 'src/services/InquiryService'

export const fetchAllInquiry = createAsyncThunk('inquiry/fetchAllInquiry', async () => {
  try {
    const res = await InquiryService.fetchAllInquiry()
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const contactPartner = createAsyncThunk('inquiry/contactPartner', async (data) => {
  try {
    const res = await InquiryService.contactPartner(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const contactById = createAsyncThunk('inquiry/contactById', async (id) => {
  try {
    const res = await InquiryService.contactById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})

export const contactPartnerConfirm = createAsyncThunk(
  'inquiry/contactPartnerConfirm',
  async (data) => {
    try {
      const res = await InquiryService.contactPartnerConfirm(data)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  },
)
const initialState = {
  loading: false,
  error: '',
  inquirys: [],
  inquiry: {},
  cPartners: [],
  id: null,
}

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  extraReducers(builder) {
    //FETCH ALL INQUIRY

    builder
      .addCase(fetchAllInquiry.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllInquiry.fulfilled, (state, { payload }) => {
        state.loading = false
        state.inquirys = payload
      })
      .addCase(fetchAllInquiry.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(contactPartner.pending, (state) => {
        state.loading = true
      })
      .addCase(contactPartner.fulfilled, (state, { payload }) => {
        state.loading = false
        state.cPartners = payload
      })
      .addCase(contactPartner.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(contactById.pending, (state) => {
        state.loading = true
      })
      .addCase(contactById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.inquiry = payload
      })
      .addCase(contactById.rejected, (state) => {
        state.loading = false
      })

    builder
      .addCase(contactPartnerConfirm.pending, (state) => {
        state.loading = true
      })
      .addCase(contactPartnerConfirm.fulfilled, (state, { payload }) => {
        state.loading = false
        state.id = payload
      })
      .addCase(contactPartnerConfirm.rejected, (state) => {
        state.loading = false
      })
  },
})
export default inquirySlice.reducer
