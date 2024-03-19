import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BecomePartnerService from 'src/services/BecomePartner'

export const getPartnerById = createAsyncThunk('becomPartner/getPartnerById', async (id) => {
  try {
    const res = await BecomePartnerService.getPartnerById(id)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
export const updatePartner = createAsyncThunk('becomePartner/updatePartner', async (data) => {
  try {
    const res = await BecomePartnerService.updatePartner(data)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
})
const initialState = {
  partners: [],
  loading: false,
  error: '',
  partner: {
    id: undefined,
    banner_image: '',
    banner_title: '',
    ourPartner_title: '',
    image1: '',
    image2: '',
    image3: '',
    image1_subtitle: '',
    image2_subtitle: '',
    image3_subtitle: '',
    page_title: '',
    page_description: '',
  },
}
const becomePartnerSlice = createSlice({
  name: 'becomePartner',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getPartnerById.pending, (state) => {
        state.loading = true
      })
      .addCase(getPartnerById.fulfilled, (state, { payload }) => {
        state.loading = false
        state.partner = payload
      })
      .addCase(getPartnerById.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(updatePartner.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePartner.fulfilled, (state, { payload }) => {
        state.loading = false
        state.partner = { ...state.partner, ...payload }
        //payload
      })
      .addCase(updatePartner.rejected, (state) => {
        state.loading = false
      })
  },
})
export default becomePartnerSlice.reducer
